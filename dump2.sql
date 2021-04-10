--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: community; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.community (
    id integer NOT NULL,
    nickname character varying NOT NULL,
    password_hash character varying NOT NULL,
    admin boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT community_nickname_check CHECK (((nickname)::text <> ''::text)),
    CONSTRAINT community_password_hash_check CHECK (((password_hash)::text <> ''::text))
);


--
-- Name: community_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.community_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: community_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.community_id_seq OWNED BY public.community.id;


--
-- Name: gigs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gigs (
    id integer NOT NULL,
    date character varying NOT NULL,
    venue character varying DEFAULT false,
    lat character varying NOT NULL,
    lng character varying NOT NULL,
    tour_name character varying DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    city character varying DEFAULT false,
    poster character varying,
    CONSTRAINT gigs_date_check CHECK (((date)::text <> ''::text)),
    CONSTRAINT gigs_lat_check CHECK (((lat)::text <> ''::text)),
    CONSTRAINT gigs_lng_check CHECK (((lng)::text <> ''::text))
);


--
-- Name: gigs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.gigs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: gigs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.gigs_id_seq OWNED BY public.gigs.id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.images (
    id integer NOT NULL,
    gig_id integer NOT NULL,
    poster character varying DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- Name: community id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community ALTER COLUMN id SET DEFAULT nextval('public.community_id_seq'::regclass);


--
-- Name: gigs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gigs ALTER COLUMN id SET DEFAULT nextval('public.gigs_id_seq'::regclass);


--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- Data for Name: community; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.community (id, nickname, password_hash, admin, created_at) FROM stdin;
1	Admin	$2a$10$JV3Ej8ftSArZwkIXAwja1ejb5pyBKFDYf8j9LifFs//lu9mE1oW4G	t	2021-03-27 11:38:52.063599
2	OzRiC	$2a$10$wNSH7RHSlCFOm07YMRWNNOMwRnC4wt3aoWh/IbF3nm3SVME2y.z3i	f	2021-03-27 11:40:30.996775
19	grgr	$2a$10$0S2ZDuTxUdjrSmNH7U87LOku/nEGyC7RXYEuEHFo3ydHhgM/ZPMq.	f	2021-03-31 10:59:32.596525
21	oz	$2a$10$zIrrGhpWVsac1SqG63rX4ehcAaP1qAW3o5eW7FRK/DDPgBCNYcf4W	f	2021-03-31 11:00:49.194582
28	spiced	$2a$10$wQ0Oh2qQnMozSUlILaSvAeXspDuu241IWVDyB65xQwKTglO4p0UWa	f	2021-04-01 17:45:57.244789
29	lydia	$2a$10$xFb5CWDWbbZsSizSUfMy2O9SrLHmZU2on96NnSvT/1paC45V3v3KG	f	2021-04-04 15:45:38.630094
30	John	$2a$10$7JzJltWhieo0X/SK.Bj0Hu.akWOfzY2buDpHwIvEF2UXGMNyVfGR6	f	2021-04-05 21:07:58.003848
\.


--
-- Data for Name: gigs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gigs (id, date, venue, lat, lng, tour_name, created_at, city, poster) FROM stdin;
1	2018-02-02	Foro Indie Rocks	19.416849115610894	-99.156184402147	U.S Tour 2018	2021-03-29 19:16:39.798242	Mexico City, ME	https://zero-psy-sp.s3.amazonaws.com/tfucvf1tVGAf2QtaCgNwBVhD88z6uOli.png
2	2018-02-03	Foro Lando	19.301315503165828	-99.65936118865751	U.S Tour 2018	2021-03-29 19:18:02.865497	Toluca, ME	https://zero-psy-sp.s3.amazonaws.com/AuCZr9j4eBWpa680vNryQxqtbpAc-xEi.jpg
74	2019-04-10	The Tote	-37.7992951945067	144.9877110976526	Australian Tour 2019	2021-04-01 12:05:37.804492	Melbourne 	\N
3	2018-02-06	Bar Le Ritz	45.53289261478667	-73.62026141321755	U.S Tour 2018	2021-03-29 19:21:22.360966	Montreal, QC	\N
4	2018-02-07	Mavericks	45.42883673992475	-75.68774077682085	U.S Tour 2018	2021-03-29 19:25:16.659894	Ottawa, ON	\N
5	2018-02-08	Hard Luck	43.65229804854383	-79.40747229978025	U.S Tour 2018	2021-03-29 19:26:50.890759	Toronto, ON	\N
6	2018-02-09	Grog Shop	41.50842240460916	-81.5803375863483	U.S Tour 2018	2021-03-29 19:28:08.731707	Cleveland, OH	\N
7	2018-02-10	Reggies Rock Club	41.85411776282939	-87.62686303077567	U.S Tour 2018	2021-03-29 20:15:10.895198	Chicago, IL	\N
8	2018-02-11	Vaudeville Mews	41.585701623875224	-93.6221802731114	U.S Tour 2018	2021-03-29 20:19:15.954292	Des Moines, IA	\N
9	2018-02-12	7th St Entry	44.97860477531662	-93.27581754419631	U.S Tour 2018	2021-03-29 20:32:25.127694	Minneapolis, MN	\N
10	2018-02-13	Record Bar	39.09519179257741	-94.58132807316612	U.S Tour 2018	2021-03-29 20:33:58.83742	Kansas City, MO	\N
11	2018-02-14	Globe Hall	39.77825187835501	-104.98250638664592	U.S Tour 2018	2021-03-29 20:35:31.931129	Denver, CO	\N
12	2018-02-15	Metro Music Hall	40.76711531920571	-111.90900867497602	U.S Tour 2018	2021-03-29 20:42:28.290574	Salt Lake City, UT	\N
13	2018-02-16	The Shredder	43.6141590701555	-116.20869924568893	U.S Tour 2018	2021-03-29 20:44:13.12158	Boise, ID	\N
14	2018-02-17	El Corazon	47.61888775296466	-122.32932927296527	U.S Tour 2018	2021-03-29 20:52:19.434545	Seattle, WA	\N
15	2018-02-18	 Astoria	49.28150794622758	-123.08786537292181	U.S Tour 2018	2021-03-29 21:09:01.903058	Vancouver, BC	\N
16	2018-02-19	Tonic Lounge	45.53088742229229	-122.63247162884196	U.S Tour 2018	2021-03-29 21:10:21.235035	Portland, OR	\N
17	2018-02-20	Brick and Mortar Music Hall	37.769931483315666	-122.42035662901787	U.S Tour 2018	2021-03-29 21:11:46.473534	San Francisco, CA	\N
18	2018-02-21	Resident	34.042801332573994	-118.2348790867608	U.S Tour 2018	2021-03-29 21:13:52.865234	Los Angeles, CA	\N
19	2018-02-22	Space	32.755224392255236	-117.11750597328962	U.S Tour 2018	2021-03-29 21:21:30.073018	San Diego, CA	\N
20	2018-02-23	The Rogue	33.45380598829354	-111.926010915344	U.S Tour 2018	2021-03-29 21:25:24.954391	Phoenix, AZ	\N
21	2018-02-25	Ridglea Theater	32.72898114216992	-97.41465190397153	U.S Tour 2018	2021-03-29 21:29:48.786803	 Ft Worth, TX	\N
22	2018-02-26	Come And Take It Live	30.241077033050196	-97.72887650216725	U.S Tour 2018	2021-03-29 21:32:09.505871	Austin, TX	\N
23	2018-02-27	Santos Bar	29.96083705504321	-90.05954270401801	U.S Tour 2018	2021-03-29 21:34:12.364928	New Orleans LA	\N
24	2018-02-28	Will’s Pub	28.56003827892722	-81.36453142918232	U.S Tour 2018	2021-03-29 21:35:35.636505	Orlando, FL	\N
25	2018-03-01	529	33.74010605898384	-84.3452833597775	U.S Tour 2018	2021-03-29 21:37:21.431685	Atlanta, GA	\N
26	2018-03-02	Champion Brewing	38.027836406967815	-78.47816613085887	U.S Tour 2018	2021-03-29 21:40:33.311749	Charlottesville, VA	\N
27	2018-03-03	Black Cat	38.91479117746453	-77.03176048851074	U.S Tour 2018	2021-03-29 21:47:03.26153	Washington, DC	\N
28	2018-03-04	Kung Fu Necktie	39.97042887077452	-75.13595365965287	U.S Tour 2018	2021-03-29 21:48:41.829463	Philadelphia, PA	\N
29	2018-03-05	Saint Vitus	40.73703316103286	-73.95508281546005	U.S Tour 2018	2021-03-29 21:50:29.078056	Brooklyn, NY	https://zero-psy-sp.s3.amazonaws.com/ljruciTrhND90jECIAVEtfusRvnR62-F.jpg
75	2019-04-11	Crown and Anchor	-34.92356724230983	138.60938339147012	Australian Tour 2019	2021-04-01 12:06:41.495822	 Adelaide	\N
76	2019-04-12	Lucy’s Love Shack	-31.95354864635234	115.86281805148577	Australian Tour 2019	2021-04-01 12:07:44.038749	Perth	\N
77	2019-04-13	Indi Bar	-31.896375075400947	115.75954970626512	Australian Tour 2019	2021-04-01 12:10:07.426116	Scarborough	\N
78	2018-04-12	Zet Pe Te	50.06505844263376	19.927322013630103	Into the Spell European Tour 2018	2021-04-01 13:04:12.447892	Krakow, PL	\N
79	2018-04-13	Smoke Over Warsaw III	52.259415253664386	21.037489170765205	Into the Spell European Tour 2018	2021-04-01 13:07:23.500367	Warsaw, PL	\N
68	2019-04-03	The Basement	-35.240159252274466	149.05946877858273	Australian Tour 2019	2021-04-01 11:46:59.883446	Canberra	\N
69	2019-04-04	Factory Floor	-33.90556719561288	151.1663390030931	Australian Tour 2019	2021-04-01 11:56:02.317411	 Sydney	\N
70	2019-04-05	Stay Gold	-37.77417149337066	144.9609178227945	Australian Tour 2019	2021-04-01 11:57:29.987317	Melbourne	\N
80	2018-04-14	Loftas	54.6713337504523	25.269749868987706	Into the Spell European Tour 2018	2021-04-01 13:08:57.014299	Vilnius, LT	\N
71	2019-04-06	Mojo Burning Festival	-27.438915323813934	153.0643938072104	Australian Tour 2019	2021-04-01 12:01:10.57165	Brisbane	https://zero-psy-sp.s3.amazonaws.com/3CBF4pT997tB9v_cmQ671Zj4aU_Shi4s.jpg
72	2019-04-07	The Barwon Club	-38.16288980157373	144.35452591300287	Australian Tour 2019	2021-04-01 12:03:16.307993	Geelong	\N
73	2019-04-09	Hobart Brewing Co	-42.881130168041906	147.3381346284734	Australian Tour 2019	2021-04-01 12:04:39.902347	Hobart 	\N
81	2018-04-15	Rockstars	59.43192434449513	24.74673032310847	Into the Spell European Tour 2018	2021-04-01 13:10:19.287782	Tallinn, EE	\N
82	2018-04-17	Kuudes Linja	60.18378440086607	24.96024265935234	Into the Spell European Tour 2018	2021-04-01 13:12:07.95561	Helsinki, FIN	\N
83	2018-04-18	I-Klubi	61.49852351774349	23.776955405986307	Into the Spell European Tour 2018	2021-04-01 13:15:54.47711	Tampere, FIN	\N
85	2018-04-21	Blå	59.92015397451092	10.75311206176064	Into the Spell European Tour 2018	2021-04-01 13:19:40.215695	Oslo, NOR	\N
84	2018-04-20	Kraken	59.29379124194941	18.080394829103966	Into the Spell European Tour 2018	2021-04-01 13:17:30.860673	Stockholm, SWE	\N
87	2018-04-23	Stengade	55.68772048197588	12.555496840752422	Into the Spell European Tour 2018	2021-04-01 13:22:56.678882	Copenhagen, DK	\N
86	2018-04-22	Plan B	55.58422929429821	13.02682696532175	Into the Spell European Tour 2018	2021-04-01 13:21:35.891095	Malmö, SWE	\N
88	2018-04-24	Festsaal Kreuzberg (Desertfest Warm-Up)	52.496994334102475	13.4520989870456	Into the Spell European Tour 2018	2021-04-01 13:25:31.425472	Berlin, DE	\N
90	2018-04-26	007	50.08056528824193	14.393129111188719	Into the Spell European Tour 2018	2021-04-01 13:27:58.517291	Prag, CZ	\N
89	2018-04-25	Pod Minoga	52.409431085417445	16.927760986110172	Into the Spell European Tour 2018	2021-04-01 13:26:42.762862	Poznan, PL	\N
91	2018-04-27	Akvárium Klub	47.498500152405505	19.0550750031652	Into the Spell European Tour 2018	2021-04-01 13:32:25.244636	Budapest, HUN	\N
92	2018-04-28	PPC	47.075910812279325	15.43175830741723	Into the Spell European Tour 2018	2021-04-01 13:33:50.043038	Graz, A	\N
93	2018-04-29	 Arena	48.187980118015126	16.41350582457234	Into the Spell European Tour 2018	2021-04-01 13:34:59.720903	Vienna, A	\N
94	2017-03-23	MIXTAPE5	42.683227995973574	23.321525193815756	Repeated & Exposed - EU Tour 2017	2021-04-01 15:01:31.632808	Sofia, BG	\N
95	2017-03-24	Fabrica	44.42240106715674	26.102577353335793	Repeated & Exposed - EU Tour 2017	2021-04-01 15:03:49.244388	 Bucharest, RO	\N
96	2017-03-25	The Shelter	46.77101738817348	23.590091470618773	Repeated & Exposed - EU Tour 2017	2021-04-01 15:09:14.8275	Cluj Napoca, RO	\N
97	2017-03-26	DAOS Club	45.750897092868236	21.217185909230263	Repeated & Exposed - EU Tour 2017	2021-04-01 15:10:53.62629	Timisoara, RO	\N
98	2017-03-28	Elektropionir	44.81785162637013	20.465948011053587	Repeated & Exposed - EU Tour 2017	2021-04-01 15:13:04.082351	Beograd, RS	\N
100	2017-03-29	The Quarter	45.23780058671762	19.843274449700846	Repeated & Exposed - EU Tour 2017	2021-04-01 15:15:24.276721	Novi Sad, RS	\N
101	2017-03-30	MKC	45.073424385870766	18.705170012008065	Repeated & Exposed - EU Tour 2017	2021-04-01 15:16:44.628928	Zupanja, HR	\N
102	2017-04-01	Under The Black Moon	48.145073021073635	11.521881956184604	Repeated & Exposed - EU Tour 2017	2021-04-01 15:29:16.606767	 Munich, DE	\N
103	2017-04-02	Werk 2	51.3105256049454	12.37308286704629	Repeated & Exposed - EU Tour 2017	2021-04-01 15:30:45.300719	Leipzig, DE	\N
104	2017-04-03	Klub 007	50.0807305231401	14.393118382353533	Repeated & Exposed - EU Tour 2017	2021-04-01 15:32:25.649109	Prague, CZ	\N
105	2017-04-04	Durer Kert	47.509917770976685	19.0903694920876	Repeated & Exposed - EU Tour 2017	2021-04-01 15:34:57.42077	Budapest, HU	\N
106	2017-04-05	Vintage Industrial Bar	45.79074928057621	15.955535638066372	Repeated & Exposed - EU Tour 2017	2021-04-01 15:36:16.866933	 Zagreb, HR	\N
107	2017-04-06	P.M.K.	47.26810132387167	11.402716151598073	Repeated & Exposed - EU Tour 2017	2021-04-01 15:38:08.630816	Innsbruck, AT	\N
108	2017-04-07	MUZ	49.45037949046721	11.055342416483436	Repeated & Exposed - EU Tour 2017	2021-04-01 15:40:41.999732	Nürnberg, DE	\N
110	2017-04-08	AJZ	50.860728146918596	12.922940742200723	Repeated & Exposed - EU Tour 2017	2021-04-01 15:43:30.960692	Chemnitz, DE	\N
111	2017-04-09	Bastard Club	52.275548108963626	8.056352527159946	Repeated & Exposed - EU Tour 2017	2021-04-01 15:45:35.610451	Osnabruck, DE	\N
112	2017-04-10	Hafenklang	53.54450025475145	9.948008924643899	Repeated & Exposed - EU Tour 2017	2021-04-01 15:47:01.432065	Hamburg, DE	\N
113	2017-04-11	Winston Kingdom	52.37394138529464	4.896247602375659	Repeated & Exposed - EU Tour 2017	2021-04-01 15:48:26.910054	Amsterdam, NL	\N
114	2017-04-12	Alte Hackerei	49.005824380193715	8.429440605019694	Repeated & Exposed - EU Tour 2017	2021-04-01 15:49:53.72822	Karlsruhe, DE	\N
115	2017-04-13	Slow Club	47.9925074991802	7.833599327044391	Repeated & Exposed - EU Tour 2017	2021-04-01 15:51:22.564872	Freiburg, DE	\N
116	2017-04-14	Coq dOr	47.35160392073039	7.908568053535922	Repeated & Exposed - EU Tour 2017	2021-04-01 15:52:38.115185	Olten, CH	\N
117	2017-04-15	Gaswerk Kulturzentrum	47.49442263198535	8.707777798196378	Repeated & Exposed - EU Tour 2017	2021-04-01 15:54:04.430693	Winterthur, CH	\N
118	2017-04-17	Dabadaba	43.315550343237994	-1.9763834212175113	Repeated & Exposed - EU Tour 2017	2021-04-01 15:55:41.838782	San Sebastian, ES	\N
119	2017-04-18	Sala Acapulco	43.539624853669636	-5.6624235179207565	Repeated & Exposed - EU Tour 2017	2021-04-01 15:57:08.382419	Gijon, ES	\N
120	2017-04-19	Cave 45	41.14945913634673	-8.614928230992216	Repeated & Exposed - EU Tour 2017	2021-04-01 15:58:13.156231	Porto, PT	\N
121	2017-04-20	RCA Club	38.756863757899815	-9.14209507524089	Repeated & Exposed - EU Tour 2017	2021-04-01 15:59:32.851649	Lisbon, PT 	\N
122	2017-04-21	Wurlitzer Ballroom	40.41971713509119	-3.702490975198596	Repeated & Exposed - EU Tour 2017	2021-04-01 16:00:50.477366	Madrid, ES	\N
123	2017-04-22	Riff Ritual Fest	41.39771992721839	2.1911028831966313	Repeated & Exposed - EU Tour 2017	2021-04-01 16:02:40.393565	Barcelona, ES	\N
124	2017-04-23	Black Sheep	43.61472070434796	3.879998296305014	Repeated & Exposed - EU Tour 2017	2021-04-01 16:03:58.611748	Montpellier, FR	\N
125	2017-04-24	Kalvingrad	46.2040504081064	6.13618744328613	Repeated & Exposed - EU Tour 2017	2021-04-01 16:05:59.330852	Genève, CH	\N
126	2017-04-25	Le Grillen	48.07575101846091	7.371124163144619	Repeated & Exposed - EU Tour 2017	2021-04-01 16:08:03.710555	Colmar, FR	\N
127	2017-04-27	Petit Bain	48.835525068701976	2.376712370055628	Repeated & Exposed - EU Tour 2017	2021-04-01 16:09:23.527565	Paris, FR	\N
128	2017-04-28	DESERTFEST London	51.53968316599808	-0.14300984814221548	Repeated & Exposed - EU Tour 2017	2021-04-01 16:12:15.215987	London, UK	\N
129	2017-04-29	Burgerweeshuis	52.25444276823475	6.155278137448387	Repeated & Exposed - EU Tour 2017	2021-04-01 16:13:40.507273	 Deventer, NL	\N
130	2017-04-30	DESERTFEST Berlin	52.508304738255546	13.452366777825512	Repeated & Exposed - EU Tour 2017	2021-04-01 16:15:04.717884	Berlin, DE	\N
131	2017-05-03	Tetris	45.646938170807736	13.768185026237221	Repeated & Exposed - EU Tour 2017	2021-04-01 16:16:21.924241	Trieste, IT	\N
132	2017-05-04	Blah Blah	45.0687829926979	7.689460585844219	Repeated & Exposed - EU Tour 2017	2021-04-01 16:17:30.026608	Torino, IT	\N
133	2017-05-05	Albatross	43.71774721898524	10.400083873468517	Repeated & Exposed - EU Tour 2017	2021-04-01 16:18:42.51103	Pisa, IT	\N
134	2017-05-06	TUBECULT Festival	42.461880703801135	14.212979566519039	Repeated & Exposed - EU Tour 2017	2021-04-01 16:21:14.647842	Pescara, IT	\N
135	2017-05-07	ARCI Open Source	41.12494273174715	16.856072070383483	Repeated & Exposed - EU Tour 2017	2021-04-01 16:22:31.395264	Bari, IT	\N
136	2006-07-18	Lechio Beach	37.93793555714736	22.85656991175788	1st Gig Ever	2021-04-01 16:24:46.75407	Korinthos, GR	https://zero-psy-sp.s3.amazonaws.com/T20F9wvwS78Lge74yBZFRNI-WoKiC8cV.png
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.images (id, gig_id, poster, created_at) FROM stdin;
\.


--
-- Name: community_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.community_id_seq', 30, true);


--
-- Name: gigs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gigs_id_seq', 155, true);


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.images_id_seq', 1, false);


--
-- Name: community community_nickname_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community
    ADD CONSTRAINT community_nickname_key UNIQUE (nickname);


--
-- Name: community community_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community
    ADD CONSTRAINT community_pkey PRIMARY KEY (id);


--
-- Name: gigs gigs_date_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gigs
    ADD CONSTRAINT gigs_date_key UNIQUE (date);


--
-- Name: gigs gigs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gigs
    ADD CONSTRAINT gigs_pkey PRIMARY KEY (id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: images images_gig_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_gig_id_fkey FOREIGN KEY (gig_id) REFERENCES public.gigs(id);


--
-- PostgreSQL database dump complete
--

