from xml.dom.pulldom import parseString
from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class ToDo(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String(200), nullable = False)
    completed = db.Column(db.Integer, default = 0)
    def __repr__(self):
        return '<Task %r>' % self.id

@app.route('/', methods = ['POST', 'GET'])
def index2():
    if request.method == 'POST':
        task_content = request.form['playto']
        new_task = ToDo(content = task_content)
        try:
            db.session.add(new_task)
            db.session.commit()
            return  redirect('index.html', new_task = new_task)
        except:
            return 'There was an issue adding your task'

    else:
        # tasks = ToDo.query.all()
        return render_template('index.html')
@app.route('/brute', methods = ['POST', 'GET'])
def index1():
    if request.method == 'POST':
        task_content = request.form['playto']
        # new_task = ToDo(content = task_content)
        # try:
        #     db.session.add(new_task)
        #     db.session.commit()
        #     return  redirect('Brute.html',new_task = new_task)
        # except:
        #     return render_template('index.html')
        return  render_template('Brute.html',task_content = task_content)
    else:
        return render_template('index.html')

@app.route('/dynamic', methods = ['POST', 'GET'])
def index():
    if request.method == 'POST':
        task_content = request.form['playto']
        print(task_content)
        # new_task = ToDo(content = task_content)
        # try:
        #     db.session.add(new_task)
        #     db.session.commit()
        #     return  redirect('Brute.html',new_task = new_task)
        # except:
        #     return render_template('index.html')
        return  render_template('Dynamic.html',task_content = task_content)
    else:
        return render_template('index.html')
'''@app.route('/delete/<int:id>')
def delete(id):
    task_to_delete = ToDo.query.get_or_404(id)
    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem deleting that task'

@app.route('/update/<int:id>', methods = ['GET', 'POST'])
def update(id):
    task = ToDo.query.get_or_404(id)
    if request.method == 'POST':
        task.content = request.form['content']
        try:
            db.session.commit()
            return redirect('/')
        except:
            return "There was an issue updating your task"
    else:
        return render_template('update.html', task = task)
'''
if __name__ == '__main__':
    app.run(debug = True)
