--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.5
-- Dumped by pg_dump version 9.6.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: checkfineamount(); Type: FUNCTION; Schema: public; Owner: hostel
--

CREATE FUNCTION checkfineamount() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      IF NEW.amount < 0 OR NEW.amount > 100000 then 
        RAISE EXCEPTION 'amount not in range.';
      END IF;
      
      RETURN NEW;
    END;
    $$;


ALTER FUNCTION public.checkfineamount() OWNER TO hostel;

--
-- Name: checkhostelcapacity(); Type: FUNCTION; Schema: public; Owner: hostel
--

CREATE FUNCTION checkhostelcapacity() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      IF NEW.capacity < 0 OR NEW.capacity > 1000 then 
        RAISE EXCEPTION 'capacity not in range.';
      END IF;
      
      RETURN NEW;
    END;
    $$;


ALTER FUNCTION public.checkhostelcapacity() OWNER TO hostel;

--
-- Name: checkinventoryqty(); Type: FUNCTION; Schema: public; Owner: hostel
--

CREATE FUNCTION checkinventoryqty() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      IF NEW.qty < 0 OR NEW.qty > 10000 then 
        RAISE EXCEPTION 'qty not in range.';
      END IF;
      
      RETURN NEW;
    END;
    $$;


ALTER FUNCTION public.checkinventoryqty() OWNER TO hostel;

--
-- Name: checkroomsfloor(); Type: FUNCTION; Schema: public; Owner: hostel
--

CREATE FUNCTION checkroomsfloor() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      IF NEW.floor < 0 OR NEW.floor > 4 then 
        RAISE EXCEPTION 'floor not in range.';
      END IF;
      
      RETURN NEW;
    END;
    $$;


ALTER FUNCTION public.checkroomsfloor() OWNER TO hostel;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: applicant; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE applicant (
    rollno integer NOT NULL,
    name character varying(30) NOT NULL,
    outsidedelhi boolean,
    CONSTRAINT applicant_rollno_check CHECK ((rollno > 0))
);


ALTER TABLE applicant OWNER TO hostel;

--
-- Name: application; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE application (
    aid integer NOT NULL,
    datesubmitted date,
    status character varying(20) DEFAULT 'WAITLISTED'::character varying,
    rollno character varying(7),
    hid integer,
    roompreference1 integer,
    roompreference2 integer,
    roompreference3 integer,
    CONSTRAINT application_datesubmitted_check CHECK (((datesubmitted > '2000-01-01'::date) AND (datesubmitted <= now())))
);


ALTER TABLE application OWNER TO hostel;

--
-- Name: application_aid_seq; Type: SEQUENCE; Schema: public; Owner: hostel
--

CREATE SEQUENCE application_aid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE application_aid_seq OWNER TO hostel;

--
-- Name: application_aid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hostel
--

ALTER SEQUENCE application_aid_seq OWNED BY application.aid;


--
-- Name: attendance; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE attendance (
    rollno character varying(7) NOT NULL,
    totalpresent integer,
    totaldays integer
);


ALTER TABLE attendance OWNER TO hostel;

--
-- Name: fines; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE fines (
    fid integer NOT NULL,
    rollno character varying(7),
    remark character varying(30) NOT NULL,
    amount integer,
    paid boolean
);


ALTER TABLE fines OWNER TO hostel;

--
-- Name: fines_fid_seq; Type: SEQUENCE; Schema: public; Owner: hostel
--

CREATE SEQUENCE fines_fid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fines_fid_seq OWNER TO hostel;

--
-- Name: fines_fid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hostel
--

ALTER SEQUENCE fines_fid_seq OWNED BY fines.fid;


--
-- Name: hostel; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE hostel (
    hid integer NOT NULL,
    name character varying(30) NOT NULL,
    capacity integer
);


ALTER TABLE hostel OWNER TO hostel;

--
-- Name: hostel_hid_seq; Type: SEQUENCE; Schema: public; Owner: hostel
--

CREATE SEQUENCE hostel_hid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hostel_hid_seq OWNER TO hostel;

--
-- Name: hostel_hid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hostel
--

ALTER SEQUENCE hostel_hid_seq OWNED BY hostel.hid;


--
-- Name: inventory; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE inventory (
    emid integer NOT NULL,
    hid integer,
    name character varying(30),
    qty integer
);


ALTER TABLE inventory OWNER TO hostel;

--
-- Name: inventory_emid_seq; Type: SEQUENCE; Schema: public; Owner: hostel
--

CREATE SEQUENCE inventory_emid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE inventory_emid_seq OWNER TO hostel;

--
-- Name: inventory_emid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hostel
--

ALTER SEQUENCE inventory_emid_seq OWNED BY inventory.emid;


--
-- Name: organises; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE organises (
    hid integer NOT NULL,
    fid integer NOT NULL,
    dateorganised date,
    expenditure integer,
    CONSTRAINT organises_dateorganised_check CHECK ((dateorganised > '2000-01-01'::date))
);


ALTER TABLE organises OWNER TO hostel;

--
-- Name: resident; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE resident (
    rollno character varying(30) NOT NULL,
    roomno character varying(30),
    hid integer
);


ALTER TABLE resident OWNER TO hostel;

--
-- Name: rooms; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE rooms (
    roomno character varying(30) NOT NULL,
    floor integer,
    hid integer NOT NULL,
    vacant boolean DEFAULT true
);


ALTER TABLE rooms OWNER TO hostel;

--
-- Name: staff; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE staff (
    sid integer NOT NULL,
    name character varying(20) NOT NULL,
    salary integer,
    hid integer,
    CONSTRAINT staff_salary_check CHECK ((salary > 0))
);


ALTER TABLE staff OWNER TO hostel;

--
-- Name: staff_sid_seq; Type: SEQUENCE; Schema: public; Owner: hostel
--

CREATE SEQUENCE staff_sid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE staff_sid_seq OWNER TO hostel;

--
-- Name: staff_sid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hostel
--

ALTER SEQUENCE staff_sid_seq OWNED BY staff.sid;


--
-- Name: student; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE student (
    rollno character varying(7) NOT NULL,
    name character varying(30) NOT NULL,
    email character varying(30) NOT NULL,
    contact character varying(10) NOT NULL,
    address character varying(200) NOT NULL,
    pincode character varying(7) NOT NULL,
    outsidedelhi boolean NOT NULL,
    pwd boolean NOT NULL
);


ALTER TABLE student OWNER TO hostel;

--
-- Name: users; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(25) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE users OWNER TO hostel;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: hostel
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO hostel;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hostel
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: warden; Type: TABLE; Schema: public; Owner: hostel
--

CREATE TABLE warden (
    username character varying(30) NOT NULL,
    name character varying(40),
    hid integer,
    password character varying(20)
);


ALTER TABLE warden OWNER TO hostel;

--
-- Name: application aid; Type: DEFAULT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY application ALTER COLUMN aid SET DEFAULT nextval('application_aid_seq'::regclass);


--
-- Name: fines fid; Type: DEFAULT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY fines ALTER COLUMN fid SET DEFAULT nextval('fines_fid_seq'::regclass);


--
-- Name: hostel hid; Type: DEFAULT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY hostel ALTER COLUMN hid SET DEFAULT nextval('hostel_hid_seq'::regclass);


--
-- Name: inventory emid; Type: DEFAULT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY inventory ALTER COLUMN emid SET DEFAULT nextval('inventory_emid_seq'::regclass);


--
-- Name: staff sid; Type: DEFAULT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY staff ALTER COLUMN sid SET DEFAULT nextval('staff_sid_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: applicant; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY applicant (rollno, name, outsidedelhi) FROM stdin;
239	Astitwa	\N
\.


--
-- Data for Name: application; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY application (aid, datesubmitted, status, rollno, hid, roompreference1, roompreference2, roompreference3) FROM stdin;
1	2018-04-26	ALLOTTED	242CO15	1	101	102	201
4	2018-04-26	WAITLISTED	268CO15	1	103	202	201
5	2018-04-26	WAITLISTED	202CO15	1	102	103	0
6	2018-04-26	WAITLISTED	203CO15	1	102	201	202
7	2018-04-26	WAITLISTED	204CO15	1	103	202	201
8	2018-04-26	WAITLISTED	208CO15	1	204	203	106
9	2018-04-26	WAITLISTED	207CO15	1	102	201	202
3	2018-04-26	ALLOTTED	253CO15	1	103	202	102
2	2018-04-26	ALLOTTED	201CO15	1	201	202	103
\.


--
-- Name: application_aid_seq; Type: SEQUENCE SET; Schema: public; Owner: hostel
--

SELECT pg_catalog.setval('application_aid_seq', 9, true);


--
-- Data for Name: attendance; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY attendance (rollno, totalpresent, totaldays) FROM stdin;
242CO15	1	2
253CO15	0	0
201CO15	0	0
\.


--
-- Data for Name: fines; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY fines (fid, rollno, remark, amount, paid) FROM stdin;
1	253CO15	Discipline	1000	f
2	201CO15	Late Entry	200	f
\.


--
-- Name: fines_fid_seq; Type: SEQUENCE SET; Schema: public; Owner: hostel
--

SELECT pg_catalog.setval('fines_fid_seq', 2, true);


--
-- Data for Name: hostel; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY hostel (hid, name, capacity) FROM stdin;
1	BH1	100
2	BH2	50
3	BH3	60
\.


--
-- Name: hostel_hid_seq; Type: SEQUENCE SET; Schema: public; Owner: hostel
--

SELECT pg_catalog.setval('hostel_hid_seq', 3, true);


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY inventory (emid, hid, name, qty) FROM stdin;
1	1	Chess	2
2	1	TT Table	1
3	1	TV	2
4	1	Shuttle	5
5	1	TT Ball	3
6	1	Cricket Bat	4
7	1	First Aid Kit	10
8	1	Stationary	10
\.


--
-- Name: inventory_emid_seq; Type: SEQUENCE SET; Schema: public; Owner: hostel
--

SELECT pg_catalog.setval('inventory_emid_seq', 8, true);


--
-- Data for Name: organises; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY organises (hid, fid, dateorganised, expenditure) FROM stdin;
\.


--
-- Data for Name: resident; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY resident (rollno, roomno, hid) FROM stdin;
242CO15	101	1
253CO15	103	1
201CO15	201	1
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY rooms (roomno, floor, hid, vacant) FROM stdin;
102	1	1	t
202	2	1	t
101	1	1	f
104	1	1	t
105	1	1	t
106	1	1	t
203	2	1	t
204	2	1	t
103	1	1	f
201	2	1	f
\.


--
-- Data for Name: staff; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY staff (sid, name, salary, hid) FROM stdin;
\.


--
-- Name: staff_sid_seq; Type: SEQUENCE SET; Schema: public; Owner: hostel
--

SELECT pg_catalog.setval('staff_sid_seq', 1, false);


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY student (rollno, name, email, contact, address, pincode, outsidedelhi, pwd) FROM stdin;
242CO15	Bhavya Aggarwal	b@cb.lk	9899175630	4/30	110008	f	f
201CO15	Aabhas	a1@cb.lk	9876543210	undefined	110001	t	f
253CO15	Dolly	d1@cb.lk	9876543210	undefined	110001	f	f
227CO15	Ram Kumar	r1@cb.lk	9876543210	undefined	110001	f	t
268CO15	Shaam Kumar	s1@cb.lk	9876543210	undefined	110001	t	t
202CO15	A A	a@a.lk	9876543210	undefined	110006	t	f
203CO15	A A	a3@cb.lk	9876543210	undefined	110006	f	f
204CO15	A A	a4@cb.lk	9876543210	undefined	110006	t	f
205CO15	A A	a5@cb.lk	9876543210	undefined	110006	t	t
206CO15	A A	a6@cb.lk	9876543210	undefined	110006	f	f
207CO15	A A	a7@cb.lk	9876543210	undefined	110006	f	t
208CO15	A A	a8@cb.lk	9876543210	undefined	110001	f	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY users (id, username, password, "createdAt", "updatedAt") FROM stdin;
1	242CO15	123456	2018-04-26 10:35:44.415+05:30	2018-04-26 10:35:44.415+05:30
2	201CO15	123456	2018-04-26 13:00:25.329+05:30	2018-04-26 13:00:25.329+05:30
3	253CO15	123456	2018-04-26 13:00:40.655+05:30	2018-04-26 13:00:40.655+05:30
4	227CO15	123456	2018-04-26 13:01:04.532+05:30	2018-04-26 13:01:04.532+05:30
5	268CO15	123456	2018-04-26 13:01:23.792+05:30	2018-04-26 13:01:23.792+05:30
6	202CO15	123456	2018-04-26 13:04:42.389+05:30	2018-04-26 13:04:42.389+05:30
7	203CO15	123456	2018-04-26 13:04:59.981+05:30	2018-04-26 13:04:59.981+05:30
8	204CO15	123456	2018-04-26 13:05:07.804+05:30	2018-04-26 13:05:07.804+05:30
9	205CO15	123456	2018-04-26 13:05:15.818+05:30	2018-04-26 13:05:15.818+05:30
10	206CO15	123456	2018-04-26 13:05:26.181+05:30	2018-04-26 13:05:26.181+05:30
11	207CO15	123456	2018-04-26 13:05:38.927+05:30	2018-04-26 13:05:38.927+05:30
12	208CO15	123456	2018-04-26 13:08:40.431+05:30	2018-04-26 13:08:40.431+05:30
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hostel
--

SELECT pg_catalog.setval('users_id_seq', 12, true);


--
-- Data for Name: warden; Type: TABLE DATA; Schema: public; Owner: hostel
--

COPY warden (username, name, hid, password) FROM stdin;
warden	Warden	1	123456
warden2	Warden 2	3	123456
warden3	Warden 3	2	123456
\.


--
-- Name: applicant applicant_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY applicant
    ADD CONSTRAINT applicant_pkey PRIMARY KEY (rollno);


--
-- Name: application application_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY application
    ADD CONSTRAINT application_pkey PRIMARY KEY (aid);


--
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (rollno);


--
-- Name: fines fines_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY fines
    ADD CONSTRAINT fines_pkey PRIMARY KEY (fid);


--
-- Name: hostel hostel_name_key; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY hostel
    ADD CONSTRAINT hostel_name_key UNIQUE (name);


--
-- Name: hostel hostel_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY hostel
    ADD CONSTRAINT hostel_pkey PRIMARY KEY (hid);


--
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (emid);


--
-- Name: organises organises_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY organises
    ADD CONSTRAINT organises_pkey PRIMARY KEY (hid, fid);


--
-- Name: resident resident_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY resident
    ADD CONSTRAINT resident_pkey PRIMARY KEY (rollno);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (roomno, hid);


--
-- Name: staff staff_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (sid);


--
-- Name: student student_email_key; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY student
    ADD CONSTRAINT student_email_key UNIQUE (email);


--
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY student
    ADD CONSTRAINT student_pkey PRIMARY KEY (rollno);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: warden warden_hid_key; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY warden
    ADD CONSTRAINT warden_hid_key UNIQUE (hid);


--
-- Name: warden warden_pkey; Type: CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY warden
    ADD CONSTRAINT warden_pkey PRIMARY KEY (username);


--
-- Name: fines checkfineamount; Type: TRIGGER; Schema: public; Owner: hostel
--

CREATE TRIGGER checkfineamount BEFORE INSERT ON fines FOR EACH ROW EXECUTE PROCEDURE checkfineamount();


--
-- Name: hostel checkhostelcapacity; Type: TRIGGER; Schema: public; Owner: hostel
--

CREATE TRIGGER checkhostelcapacity BEFORE INSERT ON hostel FOR EACH ROW EXECUTE PROCEDURE checkhostelcapacity();


--
-- Name: inventory checkinventoryqty; Type: TRIGGER; Schema: public; Owner: hostel
--

CREATE TRIGGER checkinventoryqty BEFORE INSERT ON inventory FOR EACH ROW EXECUTE PROCEDURE checkinventoryqty();


--
-- Name: rooms checkroomsfloor; Type: TRIGGER; Schema: public; Owner: hostel
--

CREATE TRIGGER checkroomsfloor BEFORE INSERT ON rooms FOR EACH ROW EXECUTE PROCEDURE checkroomsfloor();


--
-- Name: application application_rollno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY application
    ADD CONSTRAINT application_rollno_fkey FOREIGN KEY (rollno) REFERENCES student(rollno);


--
-- Name: attendance attendance_rollno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY attendance
    ADD CONSTRAINT attendance_rollno_fkey FOREIGN KEY (rollno) REFERENCES student(rollno);


--
-- Name: fines fines_rollno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY fines
    ADD CONSTRAINT fines_rollno_fkey FOREIGN KEY (rollno) REFERENCES student(rollno);


--
-- Name: inventory inventory_hid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY inventory
    ADD CONSTRAINT inventory_hid_fkey FOREIGN KEY (hid) REFERENCES hostel(hid);


--
-- Name: resident resident_hid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY resident
    ADD CONSTRAINT resident_hid_fkey FOREIGN KEY (hid) REFERENCES hostel(hid);


--
-- Name: resident resident_rollno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY resident
    ADD CONSTRAINT resident_rollno_fkey FOREIGN KEY (rollno) REFERENCES student(rollno);


--
-- Name: rooms rooms_hid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hostel
--

ALTER TABLE ONLY rooms
    ADD CONSTRAINT rooms_hid_fkey FOREIGN KEY (hid) REFERENCES hostel(hid);


--
-- PostgreSQL database dump complete
--

