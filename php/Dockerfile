# The purpose of this image is to provide a PHP development environment.

FROM richarvey/nginx-php-fpm
MAINTAINER "Wang Wei" <cnetwei@gmail.com>

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('SHA384', 'composer-setup.php') === '070854512ef404f16bac87071a6db9fd9721da1684cd4589b1196c3faf71b9a2682e2311b36a5079825e155ac7ce150d') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php --install-dir=/bin --filename=composer
RUN rm -rf composer-setup.php

ENV WEB_DIR /usr/share/nginx/html
COPY . $WEB_DIR
WORKDIR $WEB_DIR

RUN mkdir -p /var/web/runtime && chown www-data:www-data /var/web/runtime
RUN composer install
