import * as React from 'react';
import { graphql, QueryProps, DataProps } from 'react-apollo';
import gql from 'graphql-tag';

const UserInfo: React.StatelessComponent<DataProps<{ users: any }, {}>> = (
    props
) => {
    const { loading, users } = props.data;
    return loading ? (
        <p>Loading</p>
    ) : (
        <div>
            <h1>{users.node.firstName}</h1>
            <p>{users.node.id}</p>
        </div>
    );
};

export default graphql<{}, {}, {}, DataProps<{ users: any }, {}>>(
    gql`
        query getUserById($userId: ID!) {
            users {
                node(id: $userId) {
                    id
                    firstName
                }
            }
        }
    `,
    {
        options: (props: any) => ({
            variables: {
                userId: props.match.params.id || '59dc4d1e8013a1bd5cb0adce',
            },
        }),
    }
)(UserInfo);
