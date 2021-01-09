import os
import serverW.Config.db as db
from flask import Flask, session, redirect, url_for, abort, request, render_template, flash, json, jsonify
from serverW.Controllers.widgetsController import Widgets
from serverW.Controllers.usersController import User


#_________________Initialisation de APP_______________
app = Flask(__name__)
widget = Widgets()
user = User()

app.config.from_object(__name__) #Charger les config pour ce fichier app.py
#Charger la configuration par défault et réécrire les variables d'environnement
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'flaskr.db'),
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))
app.config.from_envvar('FLASKR_ SETTINGS', silent=True)
db.init_app(app)

#___________________Routes for articles_______________________
@app.route('/widgets', methods=('GET', 'POST', 'PUT', 'DELETE'))
def articleAll():
    if request.method == 'GET':
        result = widget.getWidgets()
        return jsonify(result)
    if request.method == 'POST':
        widget.postWidgets()
    if request.method == "PUT":
        widget.updateWidgets()
    if request.method == "DELETE":
        widget.deleteWidgets()

#____________________Routes for users_______________________________
@app.route('/users', methods=('GET', 'POST', 'PUT', 'DELETE'))
def users():
    if request.method == 'GET':
        result = user.getUser()
        return jsonify(result)
    if request.method == 'POST':
        user.addUser()
    if request.method == "PUT":
        user.updateUser()
    if request.method == "DELETE":
        user.deleteUser()


# #_______________________Routes for login______________________________        
# @app.route('/login', methods=('GET', 'POST'))
# def login():
#     if request.method == 'POST':
#         userLog = user.loginUser()
#         if userLog is not None:
#             session.clear()
#             session['user_id'] = userLog[0]
#             return render_template('pages/index.html', user=userLog[1])
#         else:
#             return render_template('pages/login.html')
#     else:
#         return render_template('pages/login.html')

# @app.route('/logout')
# def logout():
#         session.clear()
#         return redirect(url_for('index'))

# @app.route('/')
# def index():
#     return render_template('pages/index.html')

# @app.route('/articlesPages')
# def articlesPages():
#     wid = widget.getWidgets()
#     # articles = jsonify(arti)
#     print('articles', wid)
#     return render_template('pages/articles.html', articles=str(wid))

# @app.route('/registerPages', methods=('GET', 'POST'))
# def register():

#     if request.method == 'POST':
#         username = request.form['username']
#         email = request.form['email']
#         password = request.form['password']
#         print('password', password)
#         if username is None or email is None or password is None:
#             return "error, you have to fill in all cases"
#         else:
#             userReg = user.register(username, email, password)
#             return render_template('pages/login.html')
           
#     else:

#         return render_template('pages/register.html')

# @app.route('/loginPages', methods=('GET', 'POST'))
# def loginPage():
#     if request.method == 'POST':
#         userLog = user.loginUser()
#         if userLog is not None:
#             session.clear()
#             session['user_id'] = userLog[0]
#             return render_template('pages/index.html', user=userLog[1])
#         else:
#             return render_template('pages/login.html')
#     else:
#         return render_template('pages/login.html')



