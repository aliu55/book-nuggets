import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'

// components
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'

// redux
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'

const Post = ({ getPost, post: { post, loading }, match }) => {

    useEffect(() => {
        getPost(match.params.post_id)
    }, [getPost])

    return (
        loading || post === null ? <Spinner /> : 
        <Fragment>
                <PostItem post={post} showActions={false}/>
                <CommentForm postId={post._id}/>
                <div className="comments">
                    {post.comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={post._id}/>)}
                </div>
        </Fragment>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post,
})

export default connect(mapStateToProps, { getPost })(Post)
