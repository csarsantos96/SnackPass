--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: aluno; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aluno (
    id integer NOT NULL,
    id_pessoa integer,
    matricula character varying(50) NOT NULL,
    curso character varying(100),
    ano_ingresso integer,
    senha character varying(255),
    email character varying(255),
    nivel_ensino character varying(255)
);


ALTER TABLE public.aluno OWNER TO postgres;

--
-- Name: aluno_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aluno_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.aluno_id_seq OWNER TO postgres;

--
-- Name: aluno_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.aluno_id_seq OWNED BY public.aluno.id;


--
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    id integer NOT NULL,
    nome character varying(50) NOT NULL
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- Name: categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categoria_id_seq OWNER TO postgres;

--
-- Name: categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;


--
-- Name: funcionario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.funcionario (
    id integer NOT NULL,
    id_pessoa integer,
    data_contratacao date NOT NULL,
    cargo character varying(100) NOT NULL,
    subdivisao character varying(100),
    senha character varying(255),
    email character varying(255),
    CONSTRAINT funcionario_subdivisao_check CHECK (((subdivisao)::text = ANY ((ARRAY['Professor'::character varying, 'Coordenador Pedagógico'::character varying, 'Diretor Pedagógico'::character varying, 'Serviços Gerais'::character varying, 'Auxiliar Administrativo'::character varying])::text[])))
);


ALTER TABLE public.funcionario OWNER TO postgres;

--
-- Name: funcionario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.funcionario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.funcionario_id_seq OWNER TO postgres;

--
-- Name: funcionario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.funcionario_id_seq OWNED BY public.funcionario.id;


--
-- Name: pessoa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pessoa (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    data_nascimento date,
    cpf character varying(11),
    telefone character varying(60),
    tipo_pessoa character varying(50) NOT NULL,
    senha character varying(255) NOT NULL,
    CONSTRAINT pessoa_tipo_pessoa_check CHECK (((tipo_pessoa)::text = ANY ((ARRAY['Aluno'::character varying, 'Funcionário'::character varying])::text[])))
);


ALTER TABLE public.pessoa OWNER TO postgres;

--
-- Name: pessoa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pessoa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pessoa_id_seq OWNER TO postgres;

--
-- Name: pessoa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pessoa_id_seq OWNED BY public.pessoa.id;


--
-- Name: preco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.preco (
    id integer NOT NULL,
    id_produto integer,
    tipo_cliente character varying(50) NOT NULL,
    preco numeric(10,2) NOT NULL,
    CONSTRAINT preco_tipo_cliente_check CHECK (((tipo_cliente)::text = ANY ((ARRAY['aluno'::character varying, 'funcionario'::character varying])::text[])))
);


ALTER TABLE public.preco OWNER TO postgres;

--
-- Name: preco_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.preco_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.preco_id_seq OWNER TO postgres;

--
-- Name: preco_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.preco_id_seq OWNED BY public.preco.id;


--
-- Name: produto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produto (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    id_categoria integer,
    preco_base numeric(10,2) NOT NULL,
    preco_aluno numeric(10,2),
    preco_funcionario numeric(10,2),
    imagem character varying(255)
);


ALTER TABLE public.produto OWNER TO postgres;

--
-- Name: produto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.produto_id_seq OWNER TO postgres;

--
-- Name: produto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produto_id_seq OWNED BY public.produto.id;


--
-- Name: aluno id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aluno ALTER COLUMN id SET DEFAULT nextval('public.aluno_id_seq'::regclass);


--
-- Name: categoria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);


--
-- Name: funcionario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionario ALTER COLUMN id SET DEFAULT nextval('public.funcionario_id_seq'::regclass);


--
-- Name: pessoa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa ALTER COLUMN id SET DEFAULT nextval('public.pessoa_id_seq'::regclass);


--
-- Name: preco id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preco ALTER COLUMN id SET DEFAULT nextval('public.preco_id_seq'::regclass);


--
-- Name: produto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto ALTER COLUMN id SET DEFAULT nextval('public.produto_id_seq'::regclass);


--
-- Data for Name: aluno; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aluno (id, id_pessoa, matricula, curso, ano_ingresso, senha, email, nivel_ensino) FROM stdin;
5	\N	123456	\N	\N	$2b$10$hLgxlmB0klS3t/TwAOyWUuuRaV7S5YlcqEzgGXBs/1Ha9b9LX6X3C	exemplo@email.com	\N
7	\N	12323456	\N	\N	$2b$10$.8j.lHfcdiMSELLDFEl7du0QfHsYc6mwZQlLL6cA7Ft8gMHHf15Oi	exempl2o@email.com	\N
9	\N	123223123456	\N	\N	$2b$10$.HuZrWIznQs0nGQahdup8OSNSMO.oje8rFziXC4TL7jRJCCFDnqyK	exempl2o@email.com	\N
10	14	193456	Ensino Fundamental	\N	$2b$10$Zqc5NP9S6E2pZM5ShTpF/O7e5tcxM7ZeW4/TCdAVsyh4vEa5GaT4K	joao@email.com	\N
11	15	1234567	Ensino Médio	\N	$2b$10$Vjk1fItdnQECHUa4vYXAneeuC3oGdvoCYMBwTJNP0iCodqHHIPHVK	joao@example.com	\N
12	17	1738492	\N	\N	$2b$10$GSTXndVcQttbXlzrxippi.jArc1JlnAQELD8QTOnQ12DrzwI34Bqm	csar.santos18@gmail.com	\N
13	21	32334567	Ensino Médio	\N	$2b$10$TwRBwz2CmacsWKKxCln4XOAFzGsBu76fq74r5/XXzSYBq8jTAdtyS	josao@example.com	\N
14	29	16372	\N	\N	$2b$10$g17AgRyPUo7o.hmz0KqztOO5KeP.cDA0S42rwY2zDWpxoNjHiFZUK	santosguitarf@gmail.com	\N
15	30	7372816	\N	\N	$2b$10$uLH/6ZUJvqvBgftDx/MeaOi.W2nZr./Z5pF09UrVKfYq7BKZ0Tud6	cesar.mafra@ac.gov.br	\N
16	31	1728381	\N	\N	$2b$10$faunLKRIWRav6Q/.IiXCfuf/bdLzNadoz7S9qZkjKbN7hyFicdjCq	dalvasantosvida@gmail.com	\N
17	40	3728289	\N	\N	$2b$10$9yiXrsveh9dnTyR6fe8sted.JMmp22EHwf4S.eSoX17b.W7gLC4gu	monserra1418@exemplo.com	Ensino Infantil
18	41	1738292	\N	\N	$2b$10$3wY7sKHQHWfwQqv9LU6pQ.yTa/jJuSfrSG9WFAfm3UAlZOTz0HNSe	carlagostadegato@exemplo.com	Ensino Fundamental I
\.


--
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categoria (id, nome) FROM stdin;
1	Salgados
2	Doces
3	Bebidas
4	Sorvertes
\.


--
-- Data for Name: funcionario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.funcionario (id, id_pessoa, data_contratacao, cargo, subdivisao, senha, email) FROM stdin;
\.


--
-- Data for Name: pessoa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pessoa (id, nome, email, data_nascimento, cpf, telefone, tipo_pessoa, senha) FROM stdin;
14	João	joao@email.com	2000-01-01	\N	\N	Aluno	$2b$10$Zqc5NP9S6E2pZM5ShTpF/O7e5tcxM7ZeW4/TCdAVsyh4vEa5GaT4K
15	João Silva	joao@example.com	2005-05-01	\N	\N	Aluno	$2b$10$Vjk1fItdnQECHUa4vYXAneeuC3oGdvoCYMBwTJNP0iCodqHHIPHVK
17	Cesar Santos 	csar.santos18@gmail.com	1199-10-18	\N	\N	Aluno	$2b$10$GSTXndVcQttbXlzrxippi.jArc1JlnAQELD8QTOnQ12DrzwI34Bqm
21	João S Silva	josao@example.com	2005-05-01	\N	\N	Aluno	$2b$10$TwRBwz2CmacsWKKxCln4XOAFzGsBu76fq74r5/XXzSYBq8jTAdtyS
29	Marcos 	santosguitarf@gmail.com	1997-08-26	\N	\N	Aluno	$2b$10$g17AgRyPUo7o.hmz0KqztOO5KeP.cDA0S42rwY2zDWpxoNjHiFZUK
30	Cesar Mafra	cesar.mafra@ac.gov.br	1996-01-18	\N	\N	Aluno	$2b$10$uLH/6ZUJvqvBgftDx/MeaOi.W2nZr./Z5pF09UrVKfYq7BKZ0Tud6
31	Maria 	dalvasantosvida@gmail.com	2015-04-08	\N	\N	Aluno	$2b$10$faunLKRIWRav6Q/.IiXCfuf/bdLzNadoz7S9qZkjKbN7hyFicdjCq
34	César Augusto dos Santos Mafra	csar.santos184@gmail.com	1998-08-25	\N	\N	Aluno	$2b$10$jNksIpkYQD9l4CscI0C2.OQBTQ7/GaDzE09qKFSmfeBbw06GBlWz2
37	César Augusto dos Santos Mafra	monserra1418@uorqk.com	1998-08-25	\N	\N	Aluno	$2b$10$mAr4oMQkdX65tpI9vB2nkuVWmooY2UMHFTSRGGe00yBhPaDMOpK8q
40	César Augusto dos Santos Mafra	monserra1418@exemplo.com	1998-08-25	\N	\N	Aluno	$2b$10$9yiXrsveh9dnTyR6fe8sted.JMmp22EHwf4S.eSoX17b.W7gLC4gu
41	Carla 	carlagostadegato@exemplo.com	2019-08-04	\N	\N	Aluno	$2b$10$3wY7sKHQHWfwQqv9LU6pQ.yTa/jJuSfrSG9WFAfm3UAlZOTz0HNSe
\.


--
-- Data for Name: preco; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.preco (id, id_produto, tipo_cliente, preco) FROM stdin;
\.


--
-- Data for Name: produto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produto (id, nome, id_categoria, preco_base, preco_aluno, preco_funcionario, imagem) FROM stdin;
1	Coxinha de Frango	1	5.00	\N	\N	\N
2	Pastel de Frango	1	5.00	\N	\N	\N
3	Pastel de Carne	1	5.00	\N	\N	\N
4	Pastel de Queijo	1	5.00	\N	\N	\N
5	Patel Aberto	1	5.00	\N	\N	\N
6	Hambúrguer	1	5.00	\N	\N	\N
7	Coxinha de Frango	1	5.00	\N	\N	\N
8	KitKat	2	2.50	\N	\N	\N
9	Halls Menta	2	1.50	\N	\N	\N
10	Bolo de Chocolate	2	5.00	\N	\N	\N
11	Snickers	2	4.50	\N	\N	\N
12	Coca Cola Zero	3	2.50	\N	\N	\N
13	Coca Cola	3	1.50	\N	\N	\N
15	Pepsi	3	1.50	\N	\N	\N
16	Guaraná Antarctica	3	2.00	\N	\N	\N
17	Fanta Uva	3	5.00	\N	\N	\N
18	Água Mineral Minerale	3	1.50	\N	\N	\N
19	Suco Natural de Laranja	3	1.50	\N	\N	\N
20	Suco Natural de Acerola	3	1.50	\N	\N	\N
21	Suco Natural de Maracuja	3	1.50	\N	\N	\N
22	Gatorade	3	8.00	8.00	8.00	\N
23	Picolé cremoso	4	6.00	6.00	6.00	\N
24	Snickers	2	5.00	5.00	5.00	\N
25	Bolinho	2	3.50	3.50	3.50	\N
26	Picolé ao leite	4	2.50	2.50	2.50	\N
27	Café com leite	3	2.50	2.50	1.50	\N
28	Pão com manteiga	1	2.50	2.50	2.50	\N
29	Toddynho	3	3.00	3.00	3.00	\N
30	Mentos	2	2.00	2.00	2.00	\N
31	Picolé refrescante	4	2.00	2.00	2.00	\N
32	Tip Top	4	1.50	1.50	1.50	\N
33	Bombom	2	0.50	0.50	0.50	\N
14	Pepsi Black	3	1.50	\N	\N	\N
\.


--
-- Name: aluno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aluno_id_seq', 18, true);


--
-- Name: categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_id_seq', 4, true);


--
-- Name: funcionario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.funcionario_id_seq', 1, false);


--
-- Name: pessoa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pessoa_id_seq', 41, true);


--
-- Name: preco_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.preco_id_seq', 1, false);


--
-- Name: produto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produto_id_seq', 33, true);


--
-- Name: aluno aluno_matricula_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT aluno_matricula_key UNIQUE (matricula);


--
-- Name: aluno aluno_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT aluno_pkey PRIMARY KEY (id);


--
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);


--
-- Name: funcionario funcionario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionario
    ADD CONSTRAINT funcionario_pkey PRIMARY KEY (id);


--
-- Name: pessoa pessoa_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_cpf_key UNIQUE (cpf);


--
-- Name: pessoa pessoa_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_email_key UNIQUE (email);


--
-- Name: pessoa pessoa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_pkey PRIMARY KEY (id);


--
-- Name: preco preco_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preco
    ADD CONSTRAINT preco_pkey PRIMARY KEY (id);


--
-- Name: produto produto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto
    ADD CONSTRAINT produto_pkey PRIMARY KEY (id);


--
-- Name: aluno aluno_id_pessoa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT aluno_id_pessoa_fkey FOREIGN KEY (id_pessoa) REFERENCES public.pessoa(id) ON DELETE CASCADE;


--
-- Name: funcionario funcionario_id_pessoa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionario
    ADD CONSTRAINT funcionario_id_pessoa_fkey FOREIGN KEY (id_pessoa) REFERENCES public.pessoa(id);


--
-- Name: preco preco_id_produto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preco
    ADD CONSTRAINT preco_id_produto_fkey FOREIGN KEY (id_produto) REFERENCES public.produto(id);


--
-- Name: produto produto_id_categoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto
    ADD CONSTRAINT produto_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categoria(id);


--
-- PostgreSQL database dump complete
--

