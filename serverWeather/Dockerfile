FROM python:alpine3.8
WORKDIR /home/node/serverW
COPY serverW /home/node/serverW
RUN pip3 install virtualenv
RUN pip3 install flask

RUN export FLASK_APP="flaskr"
RUN export FLASK_ENV=development
# RUN flask run

RUN flask init-db
CMD py app.py
ENTRYPOINT ["python3"]
EXPOSE 5000
# FROM continuumio/miniconda3
# RUN apt-get update && apt-get install -y python3
# RUN apt-get install -y python3-pip
# RUN apt-get install -y build-essential

# COPY requirements.txt /
# RUN ["conda", "create", "-n", "myenv", "python=3.4"]

# RUN /bin/bash -c "source activate myenv  && pip install --trusted-host pypi.python.org -r /requirements.txt"
# RUN export FLASK_APP="flaskr"
# RUN export FLASK_ENV=development
# RUN flask run
# RUN flask init-db
