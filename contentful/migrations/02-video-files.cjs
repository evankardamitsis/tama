/**
 * Lets films be uploaded to Contentful instead of living in the repo.
 *
 *   CONTENTFUL_ENVIRONMENT=staging npm run cf:migrate -- 02-video-files
 *
 * `videoUrl` stays as the fallback. The mapper prefers an uploaded file and
 * drops back to the path, so clearing this field on an entry moves that one
 * film back to Vercel without a code change — which is the escape hatch if
 * Contentful's asset bandwidth ever gets tight.
 *
 * The hero loop is deliberately not covered: it is a plain string on the
 * `hero` type rather than a mediaItem, because it autoplays on every
 * homepage visit and would spend the free allowance on its own.
 */
module.exports = function (migration) {
  const media = migration.editContentType("mediaItem");

  media
    .createField("videoFile")
    .name("Film")
    .type("Link")
    .linkType("Asset")
    .required(false)
    .validations([{ linkMimetypeGroup: ["video"] }]);

  media.changeFieldControl("videoFile", "builtin", "assetLinkEditor", {
    helpText: "Upload the film here. Leave empty to serve it from the site's own files instead.",
  });

  media.changeFieldControl("videoUrl", "builtin", "singleLine", {
    helpText: "Fallback path, used only when no film is uploaded above.",
  });
};
