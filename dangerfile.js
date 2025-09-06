import { danger, warn, markdown, fail, message, schedule } from "danger";

const modifiedFiles = danger.git.modified_files;
const createdFiles = danger.git.created_files;
const changedFiles = [...modifiedFiles, ...createdFiles];

// PR 제목에 #이슈넘버 포함 여부 확인
if (!/.*#\d+/.test(danger.github.pr.title)) {
    warn("PR 제목에 #이슈넘버가 포함되어 있지 않습니다. 이슈 번호를 포함해주세요.");
} else {
    message("✅ PR 제목에 이슈 번호가 포함되어 있습니다.");
}

// Reviewers가 지정되어 있는지 확인
if (danger.github.pr.requested_reviewers.length === 0) {
    warn("PR에 Reviewers가 지정되어 있지 않습니다. 리뷰어를 지정해주세요.");
} else {
    message("✅ PR에 Reviewers가 지정되어 있습니다.");
}

// PR에 라벨이 지정되어 있는지 확인
if (!danger.github.issue.labels || danger.github.issue.labels.length === 0) {
    warn("PR에 라벨이 지정되어 있지 않습니다. 적절한 라벨을 추가해주세요.");
} else {
    message("✅ PR에 라벨이 지정되어 있습니다.");
}

// PR에 Assignees가 지정되어 있는지 확인
if (!danger.github.pr.assignees || danger.github.pr.assignees.length === 0) {
    warn("PR에 Assignees가 지정되어 있지 않습니다. 적절한 Assignee를 추가해주세요.");
} else {
    message("✅ PR에 Assignees가 지정되어 있습니다.");
}

// package.json 변경 확인
const packageChanges = changedFiles.filter((file) => file.includes("package.json"));
if (packageChanges.length > 0) {
    warn("package.json이 변경되었습니다. 새로운 의존성이 추가되었다면 필요성을 설명해주세요.");
    markdown(`## 📦 Package 변경사항
${packageChanges.map((file) => `- ${file}`).join("\n")}`);
} else {
    message("✅ package.json에 변경사항이 없습니다.");
}

// 브랜치 이름 확인
const branchName = danger.github.pr.head.ref;
const validBranchPattern =
    /^(feat|feature|fix|hotfix|refactor|docs|style|test|chore)#\d+(-[a-z0-9-]+)*$/;

if (!validBranchPattern.test(branchName)) {
    warn(
        `브랜치 이름 '${branchName}'이 컨벤션을 따르지 않습니다. \<PREFIX\>#\<ISSUE\> 형식으로 작성해주세요`,
    );
} else {
    message(`✅ 브랜치 이름 '${branchName}'이 컨벤션을 따릅니다.`);
}
