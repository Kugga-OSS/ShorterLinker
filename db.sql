-- id 生成器表

create table kugga_id_generator
(
    link_id bigint unsigned not null auto_increment,
    constraint kugga_id_generator_pk
        primary key (link_id)
);

alter table kugga_id_generator auto_increment = 1;

-- 对于每个连接开启时都使用如下设置，scope ： session
-- SET session.auto_increment_increment=10;

-- 链接重定向表
create table kugga_links
(
    longer_link varchar(1000) null,
    shorter_link varchar(200) null
);

create index kugga_links_longer_link_idx
    on kugga_links (longer_link(50));