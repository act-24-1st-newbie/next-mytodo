# Next + MyTodo

Next로 MyTodo만들기

## 사용 라이브러리
* next.js
* tailwindcss
* shadcn/ui
* recoil
* supabase

## 추가 파일
* .env.local
```
NEXT_PUBLIC_SUPABASE_URL=<...>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<...>
```

## 테이블 DDL
```
create table tasks(
  id serial primary key,
  contents text not null,
  is_done bool not null,
  created_date timestamptz not null default now(),
  modified_date timestamptz not null default now(),
  user_id int8 not null
);
```