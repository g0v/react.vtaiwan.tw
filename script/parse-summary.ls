require! <[ fs path gitbook-markdown ]>

function type-of (txt)
  return \gitbook if txt is /^http.*gitbook/
  return \slideshare if txt is /^http.*slideshare/
  return \image if txt is /\.(?:png|jpg)$/
  return \markdown if txt is /\.(?:md|mkdn)$/
  return \email if txt is /^mailto:/
  return \url if txt is /^https?:/
  console.log "==> Unknown type: #txt"

# pathless title denotes stage
const cwd = path.join(__dirname, '..')
const src = fs.readFileSync("#cwd/SUMMARY.md", 'utf8')

out = {StageIntro: {}, Stages: [], Site: gitbook-markdown.readme src}
{parts: [idx]} = gitbook-markdown.summary src
for {title, path, articles} in idx.articles | path
  typ = type-of path
  out.Site[typ] = path if typ isnt \markdown
  console.log "#title #typ - #path"

stage = -1 # 0-based counting
topics = {}
for {title, path, articles} in idx.articles | not path
  [title, intro] = title.split /\s*[：:]\s*/
  out.Stages.push { title, stage: "#{ ++stage }" }
  out.StageIntro["#stage"] = [intro]
  parse-articles articles

function parse-articles (articles)
  for {title, path} in articles | path
    title_eng = path - /^.*\// - /\.\w+$/
    t-out = {title_eng, title_cht: title, prefix_cht: '', prefix_eng: '', proposer_abbr_cht: '', proposer_abbr_eng: '', links: [], stages: []}
    topics[title_eng] = t-out
    parse-topic(title, path, t-out)

function parse-topic (title, path, t-out)
  console.log "> #title - #path"
  t-src = fs.readFileSync("#cwd/#path", 'utf8')
  {parts: [t-idx]} = gitbook-markdown.summary t-src
  for {title, path, articles} in t-idx.articles | path
    typ = type-of path
    t-out[typ] = path if typ isnt \markdown
  t-stage = -1
  for {title, path, articles} in t-idx.articles | not path
    event = title - /\s.*/
    dates = title - /^\S*\s*/
    if dates is /\//
      # duration - a stage
      ++t-stage
      [begin, end] = dates.split /\//
      stage-out = { name: out.Stages[t-stage].title, category: "#t-stage" }
      stage-out.start_date = (new Date begin).toUTCString!
      stage-out.end_date = (new Date end).toUTCString!
      for {title, path} in articles | path
        typ = type-of path
        stage-out[typ] = path if typ isnt \markdown
      stage-out.gitbook_url = delete stage-out.gitbook
      stage-out.discourse_url = stage-out.url - /\/c\/.*/
      t-out.stages.push stage-out
    else
      link-out = { title: event, date: (new Date dates.replace(/\+08/, 'CST')).toUTCString!, links: [] }
      for {title, path} in articles | path
        link-out.links.push {title, link: path}
      t-out.links.push link-out
  t-out.slides_url = delete t-out.slideshare
  return t-out

fs.write-file-sync "#cwd/src/SUMMARY.json", JSON.stringify(out,,2)
fs.write-file-sync "#cwd/src/Proposal/data/Proposals.json", JSON.stringify(topics,,2)

/*
  "cyberbullying": {
    "links": [
      {
        "title": "諮詢會議：網路霸凌",
        "date": "August 14, 2015 19:00:00",
        "links": [
          {
            "title": "共筆",
            "link": "https://hackpad.com/2015-08-13--p8VAnQ24OqO"
          },
          {
            "title": "重播",
            "link": "https://www.youtube.com/watch?v=D5bwEja0-O0"
          }
        ]
      }
    ],
    "stages": [
      {
        "name": "討論",
        "gitbook_url": "https://g0v.github.io/cyberbullying-gitbook",
        "discourse_url": "https://talk.vtaiwan.tw",
        "category": "1",
        "start_date": "June 16, 2015 00:00:00",
        "end_date": "August 31, 2015 23:59:59",
        "category_num": 92
      }
    ],
  },
*/
