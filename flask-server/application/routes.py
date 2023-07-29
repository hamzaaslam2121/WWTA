import sys
import requests
import logging
import datetime
from flask import jsonify, make_response, request, render_template, current_app, Blueprint
from sqlalchemy.exc import NoResultFound, SQLAlchemyError
from flask_cors import CORS

from models import Languages, User, Post, db

api = Blueprint('api', __name__)
cors = CORS()

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)


def jsonify_message(message):
	return jsonify({"message": message})


@api.route("/posts")
@api.route("/posts/<slug>")
def posts(
    slug=None,
    include_unverified=True,
    cutoff_date=None
):
    if cutoff_date is None:
        cutoff_date = datetime.date.today() - datetime.timedelta(days=730)
    if slug is None:
        if include_unverified:
            all_posts = db.session.execute(db.select(Post).filter(
                Post.date > cutoff_date
            )).scalars()
        else:
            all_posts = db.session.execute(db.select(Post).filter(
                Post.date > cutoff_date,
                Post.verified is True
            )).scalars()
        post_list = []
        for post in all_posts:
            post_dict = post.to_dict()
            post_dict['trip'] = [tt.name for tt in post_dict['trip']]
            post_list.append(post_dict)
        response = make_response(post_list), 200  # N.B. DO NOT JSONIFY: Flask does it automatically
    else:
        try:
            post = db.session.execute(db.select(Post).filter(
                Post.id == slug,
                Post.date > cutoff_date
            )).scalar_one()
            post_dict = post.to_dict()
            post_dict['trip'] = [tt.name for tt in post_dict['trip']]
            if not include_unverified and not post_dict['verified']:
                raise NoResultFound
            response = make_response(post_dict), 200
        except NoResultFound:
            logging.warning(f"Attempted to read post record with id {slug}")
            response = '', 404
    return response


# Rest of the code remains unchanged


@api.route("/add-post", methods=['POST'])
def add_post():
    data = request.get_json(force=True)

    if data.get('update_id'):
        is_update = True
        pid = data.get('update_id')
        post = db.session.execute(db.select(Post).filter_by(id=pid)).scalar_one()
        
        post = Post()
        post.title = data.get('title')
        post.url = data.get('url')
        post.language = Languages(data.get('language')).name
        post.date = datetime.date.today()
        post.latitude = data.get('latitude')
        post.longitude = data.get('longitude')

        db.session.merge(post)
        message = "Post details updated successfully!"
        

        db.session.add(post)
        message = "New post added successfully!"
        db.session.commit()
        return jsonify_message(message), 201
		


@api.route("/delete-post/<slug>", methods=['DELETE'])
def delete_post(slug=None):
	try:
		post_to_delete = db.session.execute(db.select(Post).filter_by(id=slug)).scalar_one()
		db.session.delete(post_to_delete)
		db.session.commit()
		return jsonify_message("Post deleted successfully"), 200
	except (NoResultFound, SQLAlchemyError) as e:
		logging.error(f'Exception in delete_post: {e}')
		return jsonify_message('Failed to delete post, please try again later'), 404
