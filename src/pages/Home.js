import React, {useContext} from 'react'
import { useQuery } from '@apollo/react-hooks';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/AuthContext';
import PostForm from '../components/PostForm';

function Home() {
    const { user } = useContext(AuthContext);
    const { loading, data} = useQuery(FETCH_POSTS_QUERY);
    
    return (
        <div >
            <div className="ui three column grid">
                <div className="row page-title">
                    <h1>Recent Posts</h1>
                </div>

                <div className="row" id="postcards">
                    { user && (
                        <div className="column">
                            <PostForm></PostForm>
                        </div>
                    )}

                    { loading ? (
                        <h1>loading posts...</h1>
                    ): (
                        data.getPosts && data.getPosts.map((post) => (
                            <div className="column" key={post.id}>
                                <PostCard post={post}/><br></br>
                            </div>
                        ))
                    )}
                </div> 
            </div>
        </div>
    )
}

export default Home;
