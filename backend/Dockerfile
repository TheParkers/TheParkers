FROM python:3
ENV env="django_project.settings_stage"
ENV HOST 0.0.0.0
ENV PORT 4200

RUN apt-get update -y && apt-get install -y build-essential
WORKDIR /
COPY . .
RUN pip install -r requirements.txt
RUN xargs apt-get install -y < packages.txt
RUN ldconfig
CMD python manage.py runserver --settings=${env} --insecure 0.0.0.0:4200
