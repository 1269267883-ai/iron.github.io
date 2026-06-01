import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { X } from "lucide-react"

const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
const missionVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
const solutionVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
})

const assetSrc = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`

const platforms = [
  {
    title: "SCRM社媒营销Agent出海",
    description: "User interviews, desk research, and discovery notes shaped into clear product opportunities.",
    pdfUrl: "/assets/agent_compressed_120dpi_q90.pdf",
    pageImages: [
      "/assets/agent-pages/page-01.webp",
      "/assets/agent-pages/page-02.webp",
      "/assets/agent-pages/page-03.webp",
      "/assets/agent-pages/page-04.webp",
      "/assets/agent-pages/page-05.webp",
      "/assets/agent-pages/page-06.webp",
      "/assets/agent-pages/page-07.webp",
      "/assets/agent-pages/page-08.webp",
      "/assets/agent-pages/page-09.webp",
      "/assets/agent-pages/page-10.webp",
      "/assets/agent-pages/page-11.webp",
      "/assets/agent-pages/page-12.webp",
      "/assets/agent-pages/page-13.webp",
      "/assets/agent-pages/page-14.webp",
      "/assets/agent-pages/page-15.webp",
      "/assets/agent-pages/page-16.webp",
      "/assets/agent-pages/page-17.webp",
    ],
  },
  {
    title: "AI漫剧官网设计",
    description: "Problem framing, product positioning, and experience principles for focused decisions.",
    pdfUrl: "/assets/ai-comic-site.pdf",
    pageImages: [
      "/assets/ai-comic-pages/page-01.webp",
      "/assets/ai-comic-pages/page-02.webp",
      "/assets/ai-comic-pages/page-03.webp",
      "/assets/ai-comic-pages/page-04.webp",
      "/assets/ai-comic-pages/page-05.webp",
      "/assets/ai-comic-pages/page-06.webp",
      "/assets/ai-comic-pages/page-07.webp",
      "/assets/ai-comic-pages/page-08.webp",
      "/assets/ai-comic-pages/page-09.webp",
      "/assets/ai-comic-pages/page-10.webp",
    ],
  },
  {
    title: "跨境电商ERP控制台重构",
    description: "End-to-end flows that reveal friction, intent, and moments worth improving.",
    pdfUrl: "/assets/erp-dashboard.pdf",
    pageImages: [
      "/assets/erp-pages/page-01.webp",
      "/assets/erp-pages/page-02.webp",
      "/assets/erp-pages/page-03.webp",
      "/assets/erp-pages/page-04.webp",
      "/assets/erp-pages/page-05.webp",
      "/assets/erp-pages/page-06.webp",
      "/assets/erp-pages/page-07.webp",
      "/assets/erp-pages/page-08.webp",
      "/assets/erp-pages/page-09.webp",
      "/assets/erp-pages/page-10.webp",
      "/assets/erp-pages/page-11.webp",
      "/assets/erp-pages/page-12.webp",
      "/assets/erp-pages/page-13.webp",
      "/assets/erp-pages/page-14.webp",
      "/assets/erp-pages/page-15.webp",
      "/assets/erp-pages/page-16.webp",
      "/assets/erp-pages/page-17.webp",
      "/assets/erp-pages/page-18.webp",
      "/assets/erp-pages/page-19.webp",
      "/assets/erp-pages/page-20.webp",
      "/assets/erp-pages/page-21.webp",
    ],
  },
  {
    title: "WMS仓库监控大屏设计",
    description: "AIGC-enabled warehouse dashboard: optimized IA, AI-generated flowcharts & operation posters",
    pdfUrl: "/assets/wms-dashboard.pdf",
    pageImages: [
      "/assets/wms-pages/page-01.webp",
      "/assets/wms-pages/page-02.webp",
      "/assets/wms-pages/page-03.webp",
      "/assets/wms-pages/page-04.webp",
      "/assets/wms-pages/page-05.webp",
      "/assets/wms-pages/page-06.webp",
      "/assets/wms-pages/page-07.webp",
      "/assets/wms-pages/page-08.webp",
      "/assets/wms-pages/page-09.webp",
      "/assets/wms-pages/page-10.webp",
      "/assets/wms-pages/page-11.webp",
      "/assets/wms-pages/page-12.webp",
      "/assets/wms-pages/page-13.webp",
      "/assets/wms-pages/page-14.webp",
      "/assets/wms-pages/page-15.webp",
      "/assets/wms-pages/page-16.webp",
      "/assets/wms-pages/page-17.webp",
    ],
  },
  {
    title: "师生通APP通讯录重构",
    description: "Enhance app engagement, cut redundant navigation and speed up searches for students and parents.",
    pdfUrl: "/assets/teacher-contact.pdf",
    pageImages: [
      "/assets/teacher-contact-pages/page-01.webp",
      "/assets/teacher-contact-pages/page-02.webp",
      "/assets/teacher-contact-pages/page-03.webp",
      "/assets/teacher-contact-pages/page-04.webp",
      "/assets/teacher-contact-pages/page-05.webp",
      "/assets/teacher-contact-pages/page-06.webp",
      "/assets/teacher-contact-pages/page-07.webp",
      "/assets/teacher-contact-pages/page-08.webp",
      "/assets/teacher-contact-pages/page-09.webp",
      "/assets/teacher-contact-pages/page-10.webp",
      "/assets/teacher-contact-pages/page-11.webp",
      "/assets/teacher-contact-pages/page-12.webp",
      "/assets/teacher-contact-pages/page-13.webp",
      "/assets/teacher-contact-pages/page-14.webp",
    ],
  },
]

type PortfolioProject = (typeof platforms)[number]

const resumeProfile = [
  {
    title: "应聘职位",
    content: ["交互UI设计师、UX体验设计师"],
    prominent: true,
  },
  {
    title: "基本信息",
    content: ["宋慧琳 ｜ 女 ｜ 工业设计本科 ｜ 7 年经验"],
  },
  {
    title: "个人优势",
    content: [
      "1、Agent、SaaS、ERP、SCRM、可视化、移动端、网站设计经验",
      "2、精通数据分析，需求分析、用户分析、行业分析等调研方法",
      "3、具备Vibe Design / Coding和组件库搭建经验，提升团队效率",
      "4、熟练使用Figma、Codex、GPT、即梦、Stitch、Sketch等工具",
      "5、较强的团队意识和抗压能力，乐于复盘、分享和沉淀。",
    ],
  },
  {
    title: "获奖情况",
    content: [
      "1–特美刻随行杯工业设计专利",
      "2–香薰吹风机外观设计专利",
      "3–“X-lock”智能锁获2017设计+全国青年设计师创新创客大赛优秀奖",
      "4–“K-lock”获得王力智能锁外观设计优秀奖",
      "5–“众乎网”获浙江省大学生多媒体竞赛网站类二等奖",
      "6–“Virtual Runner”获浙江省大学生多媒体竞赛网站类二等奖",
    ],
  },
  {
    title: "联系方式",
    content: ["电话：15958138109", "邮箱：15958138109@163.com", "微信："],
    contact: true,
  },
]

const resumeExperiences = [
  {
    period: "工作经历 1：2025年～2026年——言智科技",
    projects: [
      {
        title: "B端SCRM社媒营销AI Agent设计",
        duties: [
          "职责：1–担任社媒Agent体验设计负责人，开展需求分析、场景分析、流程设计、原型设计，推动产品从0到1落地。",
          "2–通过参与线上客户访谈调研国内外目标用户习惯、文化背景，产出文化层调研文档分享至团队。",
          "3–探索AI融入设计工作流，从分析–决策–执行–验收–交付全方位提升产品线设计效率。",
          "4–配合运营推广，追踪产品数据和客户满意度，复查产品设计是否满足业务预期和客户需求。",
        ],
        result: "成果：推动CerLo成功上线和持续迭代实现盈利，产品目前已经进入良好的成长期。",
      },
      {
        title: "AI漫剧官网设计——爱好剧",
        duties: [
          "职责：1–负责官网改版数据分析、获客转化分析、用户调研，产出合理的业务方案。",
          "2–追踪官网迭代后留资数据和转化数据，检验产品设计是否符合业务目标。",
          "3–制定合理的设计策略配合运营宣传和产品价值展示，通过AI提升设计侧落地效率。",
        ],
        result: "成果：官网转化率提升1.1%，有效扩大产品宣传展示产品漫剧制作能力，建立门户形象。",
      },
    ],
  },
  {
    period: "工作经历 2：2021年～2024年——百世集团",
    projects: [
      {
        title: "千易ERP数据可视化、WMS供应链",
        duties: [
          "职责：1–负责ERP和WMS产品体验设计,通过竞品分析、用户流失原因拆解、数据分析等，聚焦产品问题，制定设计目标。",
          "2–运用体系化的可视化策略结合业务痛点，产出合理、具有针对性的设计策略，提升用户体验。",
          "3–参与团队设计体系搭建，产出具有高拓展性高适应性的规范组件，提升设计效率。",
          "4–组织满意度基线调研和可用性测试，验证设计方案的合理性并规划后期设计迭代方向。",
        ],
        result: "成果：ERP重构客户满意度高达85%以上，信息架构对标用户路径契合度提升路径43%，辅助市场提升客单价25%",
      },
    ],
  },
  {
    period: "工作经历 3：2019年～2021年——杭州雅顾科技有限公司",
    projects: [
      {
        title: "制播线-云导播台V2.0",
        duties: [
          "职责：1–负责云导播台2.0体验设计，担任交互设计师。",
          "2–复盘用户反馈和线上数据，梳理产品问题，优先级排序，优化操作效率。",
          "3–深度分析业务需求，采用合理的设计策略产出契合业务目标设计方案。",
          "4–投放市场后问卷调研客户满意度，功能可用性情况，用户体验度量可行性。",
        ],
        result: "成果：经优化，云导播台元素库编辑时长缩短27%，多流画面输出效率提升23%，推进产品体验，获得广电甲方认可。",
      },
    ],
  },
]

function ResumePanel() {
  return (
    <motion.div
      className="liquid-glass mt-14 rounded-2xl px-6 py-8 text-left md:px-9 md:py-9"
      {...fadeUp(0.12)}
    >
      <div className="grid gap-9 lg:grid-cols-[0.35fr_0.65fr] lg:gap-12">
        <aside className="space-y-7">
          {resumeProfile.map((section) => (
            <section key={section.title}>
              <h3 className="border-b border-border/60 pb-2.5 text-sm font-semibold md:text-base">{section.title}</h3>
              <div className="mt-3.5 space-y-1.5">
                {section.content.map((line) => (
                  <p
                    className={
                      section.prominent
                        ? "text-2xl font-semibold leading-snug tracking-[-0.5px] text-foreground md:text-[1.7rem]"
                        : "text-[0.82rem] leading-6 text-muted-foreground md:text-sm"
                    }
                    key={line}
                  >
                    {line}
                  </p>
                ))}
              </div>
              {section.contact ? (
                <img
                  className="mt-4 h-32 w-32 bg-foreground object-cover p-1 md:h-36 md:w-36"
                  src={assetSrc("/assets/contact-qr.png")}
                  alt="宋慧琳联系方式二维码"
                />
              ) : null}
            </section>
          ))}
        </aside>

        <div className="space-y-8">
          {resumeExperiences.map((experience) => (
            <section key={experience.period}>
              <h3 className="border-b border-dashed border-border/70 pb-2.5 text-sm font-semibold md:text-base">
                {experience.period}
              </h3>
              <div className="mt-4 space-y-7">
                {experience.projects.map((project) => (
                  <article key={project.title}>
                    <h4 className="text-2xl font-semibold leading-tight tracking-[-0.5px] text-foreground md:text-[1.7rem]">
                      {project.title}
                    </h4>
                    <div className="mt-3 space-y-1.5">
                      {project.duties.map((duty) => (
                        <p className="text-[0.82rem] leading-6 text-muted-foreground md:text-sm" key={duty}>
                          {duty}
                        </p>
                      ))}
                      <p className="text-[0.82rem] leading-6 text-[hsl(var(--hero-subtitle))] md:text-sm">
                        {project.result}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen overflow-hidden px-6"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-start pb-20 pt-20 text-center">
        <motion.h1
          className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-2px] md:text-7xl lg:text-8xl"
          {...fadeUp(0.08)}
        >
          UX Portfolio Showcase
        </motion.h1>

        <motion.p
          className="mt-7 max-w-2xl text-lg leading-8 text-[hsl(var(--hero-subtitle))]"
          {...fadeUp(0.16)}
        >
          UX设计师｜宋慧琳｜7年设计经验
        </motion.p>

      </div>
    </section>
  )
}

function SearchSection() {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null)

  return (
    <section id="how-it-works" className="px-6 pb-6 pt-52 text-center md:pb-9 md:pt-64">
      <motion.h2
        className="mx-auto max-w-5xl text-5xl font-medium leading-[1.02] tracking-[-2px] md:text-7xl lg:text-8xl"
        {...fadeUp(0)}
      >
        作品集项目展示
      </motion.h2>
      <motion.p
        className="mx-auto mb-24 mt-7 max-w-2xl text-lg leading-8 text-muted-foreground"
        {...fadeUp(0.08)}
      >
        为保证项目PDF最佳显示，建议您在电脑端打开观看
      </motion.p>

      <div className="mx-auto mb-20 grid max-w-5xl gap-x-8 gap-y-16 md:grid-cols-3">
        {platforms.map((platform, index) => (
          <motion.button
            className="group relative flex min-h-[360px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-transparent px-5 py-8 text-center outline-none transition duration-300 hover:border-foreground/35 hover:bg-foreground/[0.055] focus-visible:border-foreground focus-visible:bg-foreground/[0.07]"
            key={platform.title}
            onClick={() => setActiveProject(platform)}
            type="button"
            whileHover={{ y: -8, scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
            {...fadeUp(0.1 + index * 0.08)}
          >
            <span className="absolute right-5 top-5 rounded-full border border-foreground/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[2px] text-muted-foreground opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              View PDF
            </span>
            <div
              className="flex h-[200px] w-[200px] items-center justify-center text-8xl font-semibold leading-none text-foreground transition duration-300 group-hover:text-[hsl(var(--hero-subtitle))]"
              aria-hidden="true"
            >
              {index + 1}
            </div>
            <h3 className="mt-6 text-base font-semibold">{platform.title}</h3>
            <p className="mt-3 max-w-[17rem] text-sm leading-6 text-muted-foreground">
              {platform.description}
            </p>
          </motion.button>
        ))}
      </div>

      <PortfolioModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}

function PortfolioModal({
  project,
  onClose,
}: {
  project: PortfolioProject | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!project) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose, project])

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background/85 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="liquid-glass flex h-[96vh] w-full max-w-[98rem] flex-col rounded-2xl text-left"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} 作品PDF展示`}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-1.5 md:px-5">
              <h3 className="truncate text-base font-semibold tracking-[-0.2px] md:text-lg">{project.title}</h3>
              <button
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition hover:border-foreground/60 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={onClose}
                type="button"
                aria-label="关闭作品弹窗"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 p-1 md:p-1.5">
              {project.pageImages ? (
                <ProjectPageViewer images={project.pageImages} title={project.title} key={project.title} />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-foreground/[0.025] px-6 text-center">
                  <p className="text-5xl font-semibold tracking-[-1px] text-foreground/90">PDF</p>
                  <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
                    点击项目卡片后会在此展示对应作品 PDF。文件上传后我会把这里替换成可滚动、可预览的大尺寸 PDF 面板。
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function ProjectPageViewer({ images, title }: { images: string[]; title: string }) {
  const [visibleCount, setVisibleCount] = useState(1)

  const revealRemainingPages = () => {
    window.setTimeout(() => {
      setVisibleCount(images.length)
    }, 350)
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-background">
      <div className="no-scrollbar h-full w-full overflow-y-auto px-2 py-2 md:px-3 md:py-3">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-4 pb-3">
          {images.slice(0, visibleCount).map((src, index) => (
            <img
              className="w-full rounded-[40px] bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.18)]"
              src={assetSrc(src)}
              alt={`${title} 第 ${index + 1} 页`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
              onLoad={index === 0 ? revealRemainingPages : undefined}
              key={src}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function RevealedWord({
  word,
  index,
  total,
  progress,
  highlighted,
}: {
  word: string
  index: number
  total: number
  progress: MotionValue<number>
  highlighted?: boolean
}) {
  const start = Math.max(0, index / total - 0.08)
  const end = Math.min(1, index / total + 0.22)
  const opacity = useTransform(progress, [start, end], [0.15, 1])

  return (
    <motion.span
      className={highlighted ? "text-foreground" : "text-[hsl(var(--hero-subtitle))]"}
      style={{ opacity }}
    >
      {word}{" "}
    </motion.span>
  )
}

function WordReveal({
  text,
  progress,
  highlights = [],
  className,
}: {
  text: string
  progress: MotionValue<number>
  highlights?: string[]
  className?: string
}) {
  const words = text.split(" ")
  return (
    <p className={className}>
      {words.map((word, index) => {
        const normalized = word.toLowerCase().replace(/[—.,]/g, "")
        return (
          <RevealedWord
            word={word}
            index={index}
            total={words.length}
            progress={progress}
            highlighted={highlights.includes(normalized)}
            key={`${word}-${index}`}
          />
        )
      })}
    </p>
  )
}

function MissionSection() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 45%"],
  })

  return (
    <section id="philosophy" ref={ref} className="px-6 pb-32 pt-0 md:pb-44">
      <motion.video
        className="mx-auto aspect-square w-full max-w-[400px] object-cover"
        src={missionVideo}
        autoPlay
        muted
        loop
        playsInline
        {...fadeUp(0)}
      />
      <div className="mx-auto mt-16 max-w-6xl">
        <WordReveal
          className="text-center text-2xl font-medium leading-tight tracking-[-1px] md:text-4xl lg:text-5xl"
          text="个人简历"
          progress={scrollYProgress}
        />
        <ResumePanel />
      </div>
    </section>
  )
}

function SolutionSection() {
  return (
    <section className="border-t border-border/30 px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mx-auto max-w-4xl text-center text-4xl font-medium leading-tight tracking-[-1px] md:text-6xl"
          {...fadeUp(0.08)}
        >
          谢谢您的观看
        </motion.h2>
        <motion.video
          className="mt-14 aspect-[3/1] w-full rounded-2xl object-cover"
          src={solutionVideo}
          autoPlay
          muted
          loop
          playsInline
          {...fadeUp(0.16)}
        />
      </div>
    </section>
  )
}

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <MissionSection />
      <SearchSection />
      <SolutionSection />
    </main>
  )
}

export default App
