FROM python:3
ENV env="django_project.settings_dev"
ENV PORT 8000
ENV HOST 0.0.0.0

RUN apt-get update -y && apt-get install -y build-essential
WORKDIR /
COPY . .
RUN pip install -r backend/requirements.txt
WORKDIR /backend
CMD python manage.py runserver --settings=${env} --insecure 0.0.0.0:8000 