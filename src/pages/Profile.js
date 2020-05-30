import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import avatar from '../images/avatar.png';
import moment from 'moment';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm'
import { Link } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Profile() {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    let profileMarkup;
    if (!user) {
        profileMarkup = (
            <div className="ui placeholder segment">
                <div className="ui icon header">
                    <i className="user circle outline icon"></i>
                    User not logged In
                </div>
                <Link to="/login">
                    <div className="ui primary button">LOGIN PAGE</div>
                </Link>
            </div>
        )
    } else {
        profileMarkup = (
            <div className="ui grid ">
            <div className="row">
                <div id="avatar-card">
                    <div className="four wide column" style={{position: "sticky", top: 10}} >
                        <div className="ui card" >
                            <div>
                                <img className="right floated mini ui image" 
                                    src={avatar} 
                                    alt="avatar" 
                                    float="right"
                                    style={{width:"21rem"}} 
                                    /> 
                            </div>
                            <div className="content">
                                <div className="header"><b>User:  </b>{user.username}</div>
                                <div className="meta">
                                <span className="date"> Joined on {moment(user.createdAt).format('YYYY/MM/DD')}</span>
                                </div>
                                <div className="email">
                                    <b>Email:</b> {user.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                    <div className="twelve wide column">
                    <div id="mypost-card">                
                        <div className="row">
                            
                            { user && (
                                <div className="column" id="recentposts">
                                   <br></br> <PostForm></PostForm><br></br>
                                </div>
                            )}
                            <div className="row page-title">
                                <h1 style={{marginBottom:"2rem"}}>Your Recent Posts</h1>
                            </div>
                            
                            { loading ? (
                                <h1>loading posts...</h1>
                            ): (
                                data.getPosts && data.getPosts.filter((p) => p.username === user.username).map((post) => (
                                    <div className="column" id="recentposts" key={post.id}>
                                        <PostCard post={post} /><br></br>
                                    </div>
                                ))
                            )}
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        )
    }

    return profileMarkup;
}

export default Profile;
 
