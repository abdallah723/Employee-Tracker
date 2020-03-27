drop database if exists csm_db;

create database csm_db;

use csm_db;

create table department (
    id int not null auto_increment,
    dep_name varchar(30) not null,
    primary key (id)
);

create table roles (
    id int not null auto_increment,
    title varchar(30) not null,
    salary DECIMAL (15,2),
    department_id int not null,
    primary key (id)
);

create table employee (
    id int not null auto_increment,
    
    first_name varchar (30) not null,
    last_name varchar (30) not null,
    role_id int not null,
    manager_id int,
    primary key (id)
);

