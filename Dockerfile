FROM python:3
ENV env="django_project.settings_dev"
RUN apt-get update -y && apt-get install -y build-essential
WORKDIR /
COPY . .
RUN pip install -r requirements.txt
WORKDIR /backend
EXPOSE 5000
CMD python manage.py runserver --settings=${env} --insecure 0.0.0.0:8000 