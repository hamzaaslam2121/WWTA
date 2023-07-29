import logging
import os
from flask import Flask
from flask_migrate import Migrate
from flask_mail import Mail
from models import db, User
from routes import api, cors


def create_app(test_config=None):
	app = Flask(__name__, instance_relative_config=False)
	app.register_blueprint(api)

	if test_config is None:
		app.config.from_pyfile('config.py', silent=True)
		logging.info("Running with full config")
	else:
		app.config.from_pyfile(test_config)
		logging.info("Running with test config")

	try:
		os.makedirs(app.instance_path)
	except OSError:
		pass

	db.init_app(app)
	Migrate(app, db)

	cors.init_app(app, resources={r'*': {'origins': ['http://localhost:3000']}})

	Mail(app)

	return app

if __name__ == "__main__":
    app = create_app()

    # Set the host and port for the app to run on (optional)
    # app.run(host="0.0.0.0", port=5000)

    app.run()