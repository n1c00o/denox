import { Semver } from "./semver.ts";

async function getLatestVersion(repoName: string): Promise<string> {
  const response = await fetch(`https://api.github.com/repos/${repoName}/tags`);
  const data = await response.json();
  return data[0].name;
}

function isCurrentLatestVersion(
  currentVersion: string,
  latestVersion: string,
): boolean {
  return new Semver(currentVersion)._(">=", new Semver(latestVersion));
}

async function upgradeVersionMessage(
  currentVersion: string,
  repoName: string,
): Promise<void> {
  try {
    const latestVersion = await getLatestVersion(repoName);

    if (!isCurrentLatestVersion(currentVersion, latestVersion)) {
      console.log(`
        denox update available from ${currentVersion} to ${latestVersion}
        To upgrade run deno install -Af -n denox https://denopkg.com/BentoumiTech/denox/denox.ts
      `);
    }
  } catch (error) {
    // continue regardless of error
  }
}

export { upgradeVersionMessage };
