import { bold, red, redBright } from "colorette";
import { deleteSync } from "del";

/**
 * Delete folders before and after the build
 * @param {string[]} sfolders The folders to delete at the start of the build
 * @param {string[]} efolders The folders to delete at the end of the build
 * @returns {import('rollup').Plugin}
 */
export default function foldersDelete(sfolders, efolders) {
  function del(folders) {
    const deleted = deleteSync(folders, { force: true });
    deleted.forEach((f) => console.log(red(`deleted: ${redBright(bold(f))}`)));
  }
  return {
    name: "folders-delete",
    buildStart: () => del(sfolders),
    buildEnd: () => del(efolders),
  };
}
