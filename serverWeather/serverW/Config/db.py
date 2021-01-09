
import sqlite3
import click
from flask import g, current_app
from flask.cli import with_appcontext



def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        # g.db.row_factory = sqlite3.Row

    return g.db

@click.command('init-db')
@with_appcontext
def initdb_command():
        init_db()
        print('Initialized the database.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(initdb_command)

# def get_db():
#         if not hasattr(g, 'sqlite_db'):
#             g.sqlite_db = connect_db()
#             return g.sqlite_db    

def init_db():
        db = get_db()
        with current_app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()    

def close_db(e=None):
        db = g.pop('db', None)
        if db is not None:
            db.close()    

def query_db(query):
        cur = get_db().execute(query)
        cur.close()