1. wybieramy  rekordy z tabeli bugs (pole cf_19 ma id-ki oddzielone przecinkiem - max 3 wartosci odwdzielone przecinkiem, ktore sa polaczeniem z tabela profilers.userid)
2. z tych rekordow z p.1 wybieramy rekordy ktore nachodza na siebie w przedziale  czasowym  ( od cf_7 do cf_8) - czyli joinujemy rekordy polaczone kazdy z kazdym i sprawdzamy czy na siebie nachodza



select  t2.* from
	(select ANY_VALUE(realname) as realname, ANY_VALUE( tmp.bug_id) as bug_id, ANY_VALUE( tmp.cf_7) as cf_7,  ANY_VALUE( tmp.cf_8) as cf_8, tmp.cf_2, ANY_VALUE(tmp.cf_19) as cf_19 from profiles
	left join (select   bug_id, cf_7, cf_8, cf_2, cf_19,  substring_index(  SUBSTRING_INDEX(  cf_19, ',', n  ), ',', -1)  as  items_cf_19
	from bugs
	join (select 1 as n union select 2 as n union select 3 as n) as num
		on char_length( cf_19) - char_length(replace( cf_19, ',', ''))  >= n - 1) as tmp
	on ( tmp.items_cf_19 =  profiles.userid  )
	where true
	and tmp.bug_id is not null
	group by  tmp.cf_2
	order by  ANY_VALUE(tmp.cf_7)) as t1
join
	(select ANY_VALUE(realname) as realname, ANY_VALUE( tmp.bug_id) as bug_id, ANY_VALUE( tmp.cf_7) as cf_7,  ANY_VALUE( tmp.cf_8) as cf_8, tmp.cf_2, ANY_VALUE(tmp.cf_19) as cf_19 from profiles
	left join (select   bug_id, cf_7, cf_8, cf_2, cf_19,  substring_index(  SUBSTRING_INDEX(  cf_19, ',', n  ), ',', -1)  as  items_cf_19
	from bugs
	join (select 1 as n union select 2 as n union select 3 as n) as num
		on char_length( cf_19) - char_length(replace( cf_19, ',', ''))  >= n - 1) as tmp
	on ( tmp.items_cf_19 =  profiles.userid  )
	where true
	and tmp.bug_id is not null
	group by  tmp.cf_2
	order by  ANY_VALUE(tmp.cf_7)) as t2
where
	true
	and ((t2.cf_7 >= t1.cf_7) and (t2.cf_7 <= t1.cf_8)) or ((t2.cf_8 >= t1.cf_7  ) and  (t2.cf_8 <= t1.cf_8))
group by t2.cf_2
having count(t1.cf_2) > 1
;

