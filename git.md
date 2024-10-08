# Xóa nhánh local không cần thiết

git branch -d feature/old-feature

# Xóa nhánh remote không cần thiết

git push origin --delete feature/old-feature

# merge nhánh hiện tại với feature có comment

git merge --no-ff feature/new-feature -m "Merge feature/new-feature into develop: Implement new feature"
git pull origin develop

## thao tác nhanh với git flow

git flow feature start new-feature

# chuyển nhánh dev, merge, xóa feature có comment

git flow feature finish -m "Merge feature/new-feature into develop: Implement new feature" new-feature

cd repo-backup

# Kéo các thay đổi từ nhánh main của repo-working

git pull ../repo-working main

# Kéo các thay đổi từ nhánh develop của repo-working

git pull ../repo-working develop

# Kéo các nhánh khác nếu cần thiết

git pull ../repo-working feature/some-feature
