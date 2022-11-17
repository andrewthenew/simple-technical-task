# Only for dev purposes.
FROM php:7.4.2-apache-buster AS mydev
RUN apt-get install bash && \
    echo 'alias ll="ls -alF"' >> ~/.bashrc

USER root
WORKDIR /var/www/html

ENV NODE_ENV development

RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs \
    npm \
    # cleanup
    && docker-php-source delete \
    && rm -rf /var/lib/apt/lists/* \
    && apt autoremove -y

# Volume binding used, so not much here...
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite

CMD ["apachectl", "-D", "FOREGROUND"]
