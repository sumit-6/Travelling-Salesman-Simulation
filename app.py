from xml.dom.pulldom import parseString
from flask import Flask, render_template, url_for, request, redirect
app = Flask(__name__)

Brute_Cities = ''
Dynamic_Cities=''
Genetic_Cities=''

@app.route('/', methods = ['POST', 'GET'])
def index():
    return render_template('index.html')
@app.route('/brute', methods = ['POST', 'GET'])
def brute():
    global Brute_Cities
    if request.method == 'POST':
        task_content = request.form['playto']
        Brute_Cities = task_content
        return  render_template('GetPoints(Brute).html',task_content = task_content)
    else:
        return render_template('index.html')

@app.route('/dynamic', methods = ['POST', 'GET'])
def dynamic():
    global Dynamic_Cities
    if request.method == 'POST':
        task_content = request.form['playto']
        Dynamic_Cities = task_content
        return  render_template('GetPoints(Dynamic).html',task_content = task_content)
    else:
        return render_template('index.html')

@app.route('/genetic', methods = ['POST', 'GET'])
def genetic():
    global Genetic_Cities
    if request.method == 'POST':
        task_content = request.form['playto']
        Genetic_Cities = task_content
        return  render_template('GetPoints(genetic).html',task_content = task_content)
    else:
        return render_template('index.html')

@app.route('/playBrute', methods = ['POST', 'GET'])
def getPointsBrute():
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
def getPointsRandomBrute():
    if request.method == 'POST':
        task_content = '1 ' + Brute_Cities
        return render_template('Brute.html', task_content = task_content)
    else:
        return render_template('index.html')

@app.route('/playDynamic', methods = ['POST', 'GET'])
def getPointsDynamic():
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
def getPointsRandomDynamic():
    if request.method == 'POST':
        task_content = '1 ' + Dynamic_Cities
        return render_template('Dynamic.html', task_content = task_content)
    else:
        return render_template('index.html')

@app.route('/playGenetic', methods = ['POST', 'GET'])
def getPointsGenetic():
    if request.method == 'POST':
        task_content = '0 ' + Genetic_Cities + ' '
        for i in range((int(Genetic_Cities))*2):
            if(i < (int(Genetic_Cities))*2 - 1):
                task_content += request.form[str(i)] + ' '
            else:
                task_content += request.form[str(i)]
        return render_template('genetic.html', task_content = task_content)
    else:
        return render_template('index.html')

@app.route('/playRandomGenetic', methods = ['POST', 'GET'])
def getPointsRandomGenetic():
    if request.method == 'POST':
        task_content = '1 ' + Genetic_Cities
        return render_template('genetic.html', task_content = task_content)
    else:
        return render_template('index.html')


#@app.route('/genetic', methods = ['POST', 'GET'])
#def genetic():
#    return render_template('genetic.html')

if __name__ == '__main__':
    app.run(debug = True)
