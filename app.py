from xml.dom.pulldom import parseString
from flask import Flask, render_template, url_for, request, redirect
app = Flask(__name__)

Brute_Cities = ''
Dynamic_Cities=''

@app.route('/', methods = ['POST', 'GET'])
def index2():
    return render_template('index.html')
@app.route('/brute', methods = ['POST', 'GET'])
def index1():
    global Brute_Cities
    if request.method == 'POST':
        task_content = request.form['playto']
        Brute_Cities = task_content
        return  render_template('GetPoints(Brute).html',task_content = task_content)
    else:
        return render_template('index.html')

@app.route('/dynamic', methods = ['POST', 'GET'])
def index():
    global Dynamic_Cities
    if request.method == 'POST':
        task_content = request.form['playto']
        Dynamic_Cities = task_content
        return  render_template('GetPoints(Dynamic).html',task_content = task_content)
    else:
        return render_template('index.html')

@app.route('/playBrute', methods = ['POST', 'GET'])
def getPoints():
    if request.method == 'POST':
        task_content = '0 ' + Brute_Cities + ' '
        for i in range((int(Brute_Cities))*2):
            if(i < (int(Brute_Cities))*2 - 1):
                task_content += request.form[str(i)] + ' '
            else:
                task_content += request.form[str(i)]
        return render_template('Brute.html', task_content = task_content)
    else:
        return render_template('index.html')

@app.route('/playRandomBrute', methods = ['POST', 'GET'])
def getPoints1():
    if request.method == 'POST':
        task_content = '1 ' + Brute_Cities
        return render_template('Brute.html', task_content = task_content)
    else:
        return render_template('index.html')

@app.route('/playDynamic', methods = ['POST', 'GET'])
def getPoints2():
    if request.method == 'POST':
        task_content = '0 ' + Dynamic_Cities + ' '
        for i in range((int(Brute_Cities))*2):
            if(i < (int(Brute_Cities))*2 - 1):
                task_content += request.form[str(i)] + ' '
            else:
                task_content += request.form[str(i)]
        return render_template('Dynamic.html', task_content = task_content)
    else:
        return render_template('index.html')

@app.route('/playRandomDynamic', methods = ['POST', 'GET'])
def getPoints12():
    if request.method == 'POST':
        task_content = '1 ' + Dynamic_Cities
        return render_template('Dynamic.html', task_content = task_content)
    else:
        return render_template('index.html')

if __name__ == '__main__':
    app.run(debug = True)
