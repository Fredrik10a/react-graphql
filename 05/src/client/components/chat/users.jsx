import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Loading from '@client/components/loader';
import { GET_USERS, ADD_CHAT } from './queries';

const Users = ({ onUsersLoaded }) => {
    const [addChat] = useMutation(ADD_CHAT);
    const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS);

    useEffect(() => {
        const initUsers = async () => {
            if (usersLoading || !usersData) return;
            try {
                for (const user of usersData.users) {
                    await addChat({
                        variables: {
                            chat: {
                                users: ['65f21051f15bdcc363a49e40', user.id],
                            },
                        },
                    });
                }
                if (onUsersLoaded) {
                    onUsersLoaded(usersData.users);
                }
            } catch (error) {
                console.error('Error creating chat:', error);
            }
        };
        initUsers();
    }, [usersLoading, usersData, addChat, onUsersLoaded]);

    if (usersError) return <p>Error: {usersError.message}</p>;
    if (usersLoading) return <Loading />;

    return null;
};

export default Users;
