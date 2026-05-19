/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/blog/modern-claude-commits-or-abandons',
        destination: '/blog/sonnet-4-6-drops-format-rule-on-long-agent-runs',
        permanent: true,
      },
    ]
  },
}
