Fix cancel
Force build
Force build
<-- 必要なら Postgres にログインしてから：
-- docker exec -it windmill_postgres psql -U windmill -d windmill

-- 一撃SQL（完全なユーザー削除＋再登録）

DELETE FROM password WHERE email = 'newadmin@example.com';
DELETE FROM usr WHERE email = 'newadmin@example.com';

INSERT INTO usr (
  workspace_id, username, email, is_admin, created_at, operator, disabled, role
) VALUES (
  'admins', 'newadmin', 'newadmin@example.com', true, now(), false, false, 'admin'
);

INSERT INTO password (
  email, password_hash, login_type, super_admin, verified, name, company, first_time_user, username, devops
) VALUES (
  'newadmin@example.com',
  'b/kmxTarWzfzZaHTO35tatWGwI8IlewXWC2hvHTPIc/Ez9Cy',
  'password',
  true,
  true,
  'CLI Admin',
  'NEXUTHA',
  false,
  'newadmin',
  false Updated 2025年 8月11日 月曜日 11時43分20秒 JST -->
