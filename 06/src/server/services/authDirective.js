import { mapSchema, getDirectives, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';
import jwt from 'jsonwebtoken';

export const authDirectiveTypeDefs = `
  directive @auth on FIELD_DEFINITION
`;

export function authDirectiveTransformer(schema) {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            const directives = getDirectives(schema, fieldConfig);
            const authDirective = directives.find((directive) => directive.name === 'auth');

            if (authDirective) {
                const { resolve = defaultFieldResolver } = fieldConfig;
                fieldConfig.resolve = async function (source, args, context, info) {
                    console.log('Auth directive in action...');
                    const token = context.req.cookies.token || context.req.headers.authorization?.replace('Bearer ', '');
                    if (!token) {
                        throw new Error('Authentication required');
                    }

                    try {
                        const user = jwt.verify(token, process.env.JWT_SECRET);
                        context.user = user;
                        console.log('User authenticated in directive:', user);
                    } catch (err) {
                        console.log('Token verification failed in directive:', err);
                        throw new Error('Invalid token');
                    }

                    return resolve(source, args, context, info);
                };
            }

            return fieldConfig;
        },
    });
}
