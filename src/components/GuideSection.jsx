import { useState } from 'react'
import './GuideSection.css'

const ARTICLES = [
  {
    id: 'budget-guide',
    cat: '구매 가이드',
    catColor: '#66FCF1',
    date: '2026.02',
    readTime: '8분',
    title: '2026년 예산별 그래픽카드 완벽 추천 가이드',
    summary: '20만원부터 200만원까지, 예산에 맞는 최선의 그래픽카드를 선정했습니다. 게이밍·창작·AI 워크로드별 최적 선택지를 알아보세요.',
    sections: [
      {
        heading: '20~30만원 — FHD 입문 최강 가성비',
        body: `이 구간에서는 AMD RX 7600과 GTX 1660 Super가 최강의 선택입니다. RX 7600은 최신 RDNA 3 아키텍처 기반으로 8GB GDDR6 메모리를 탑재하고 있어 FHD 게이밍에서 대부분의 최신 타이틀을 60~120fps로 즐길 수 있습니다. AMD FSR 3.0 기술로 성능을 추가로 끌어올릴 수 있고, AV1 하드웨어 디코딩·인코딩도 지원해 유튜브 고화질 스트리밍에도 최적입니다.

Intel Arc A750은 가격 대비 우수한 성능과 함께 AV1 인코딩 지원으로 스트리머에게 매력적인 선택입니다. XeSS(Intel 초해상도 기술)도 점점 지원 게임이 늘어나고 있어 미래 지향적인 선택이 될 수 있습니다.`
      },
      {
        heading: '40~60만원 — FHD 종결, QHD 입문 최적 구간',
        body: `현재 가장 많은 유저에게 추천하는 구간입니다. RTX 4060 Ti와 RX 7700 XT, 그리고 Intel Arc B580이 이 가격대에서 치열한 경쟁을 펼치고 있습니다.

RTX 4060 Ti는 DLSS 3.0 Frame Generation으로 실제 렌더링 프레임보다 훨씬 높은 체감 fps를 제공합니다. 165W의 저전력으로 소음도 적고 발열 관리도 쉽습니다. RX 7700 XT는 12GB VRAM으로 넉넉한 메모리와 QHD에서도 충분한 성능을 제공합니다.

Intel Arc B580은 12GB VRAM에 최신 Battlemage 아키텍처로 가격 대비 최고의 스펙을 자랑합니다. XeSS 2.0 지원으로 향후 지원 게임이 늘어날수록 더욱 빛을 발할 제품입니다.`
      },
      {
        heading: '70~100만원 — QHD 탁월, 4K 입문 가능',
        body: `이 구간에서는 RTX 4070 Super와 RX 7800 XT가 압도적인 가성비를 보여줍니다. RTX 4070 Super는 RTX 4070 Ti 대비 저렴한 가격에 90% 이상의 성능을 내며, DLSS 3.5와 Frame Generation을 완벽히 지원합니다.

RX 7800 XT는 QHD 게이밍 가성비 최강자로 평가받습니다. 16GB의 넉넉한 VRAM과 함께 미래 게임 타이틀에서도 VRAM 부족 현상 없이 쾌적하게 즐길 수 있습니다.`
      },
      {
        heading: '100만원 이상 — 4K 게이밍 & 전문 작업',
        body: `100만원 이상의 예산이라면 RTX 4080 Super, RX 7900 XTX를 고려해보세요. 두 제품 모두 4K에서 고프레임 게이밍이 가능하며, AI 학습·3D 렌더링·영상 편집 등 전문가 작업에도 충분한 성능을 발휘합니다.

RTX 4090은 현존 최강이지만 200만원을 넘는 고가에 가성비는 낮습니다. 최고 성능이 필요한 크리에이터나 AI 연구자에게 추천합니다. RX 7900 XTX는 RTX 4090의 70% 가격에 90% 이상의 성능을 제공해 가성비 최상위 하이엔드 선택입니다.`
      },
    ]
  },
  {
    id: 'vram-guide',
    cat: '스펙 분석',
    catColor: '#76B900',
    date: '2026.02',
    readTime: '6분',
    title: 'VRAM 용량이 게이밍에 미치는 영향 — 8GB vs 12GB vs 16GB 완전 분석',
    summary: '그래픽카드 선택 시 가장 논란이 많은 VRAM 용량. 8GB로도 충분한지, 12GB가 필요한지, 언제 16GB가 필요한지 실제 데이터로 알아봅니다.',
    sections: [
      {
        heading: 'VRAM이란 무엇인가?',
        body: `VRAM(Video RAM)은 그래픽카드에 장착된 전용 메모리입니다. GPU가 렌더링에 필요한 텍스처, 프레임 버퍼, 셰이더 데이터 등을 저장하는 고속 메모리로, 일반 시스템 RAM과는 별개입니다.

VRAM이 부족하면 GPU가 시스템 RAM을 임시로 사용하는 "VRAM 오버플로우" 현상이 발생합니다. 이때 성능이 급격히 저하되어 프레임 드롭, 텍스처 팝핑, 심한 경우 게임 크래시까지 발생할 수 있습니다.`
      },
      {
        heading: '8GB VRAM — 2026년 기준 얼마나 부족한가?',
        body: `FHD(1080p) 해상도에서 대부분의 최신 게임은 8GB VRAM으로 충분합니다. 다만 콜 오브 듀티: 블랙 옵스 6, 사이버펑크 2077(울트라 설정), Alan Wake 2 같은 고품질 텍스처를 사용하는 게임에서는 8GB가 빠듯해지기 시작합니다.

QHD(1440p) 이상에서는 8GB의 한계가 더욱 두드러집니다. 2024~2025년 출시된 AAA 타이틀 중 일부는 QHD 울트라 설정에서 8GB를 초과하는 경우가 생겨났습니다. RTX 4060 Ti 8GB가 비판받는 이유 중 하나가 바로 이 VRAM 한계입니다.`
      },
      {
        heading: '12GB VRAM — 현재 FHD/QHD 안전 마지노선',
        body: `12GB는 2026년 기준 가장 균형 잡힌 VRAM 용량입니다. FHD에서 텍스처 품질 걱정 없이 최고 설정을 마음껏 즐길 수 있고, QHD에서도 대부분의 타이틀에서 울트라 설정이 가능합니다.

RTX 4070(12GB), RX 7700 XT(12GB), Arc B580(12GB) 등이 이 구간에 속합니다. 향후 2~3년간 FHD/QHD 메인스트림 게이밍에 충분한 용량입니다.`
      },
      {
        heading: '16GB 이상 VRAM — 언제 필요한가?',
        body: `16GB VRAM은 다음과 같은 사용자에게 필요합니다: 4K 게이밍, AI 이미지 생성(Stable Diffusion), 3D 렌더링·모델링(Blender, 3ds Max), 대용량 머신러닝 모델 학습 등입니다.

RX 7800 XT(16GB), RTX 4060 Ti 16GB, Arc B580(12GB → 실제는 B570이 10GB) 같은 16GB 제품들이 미래 게이밍을 대비한 안전한 선택입니다. 특히 AI/크리에이터 작업을 겸하는 분께는 강력히 권장합니다.`
      },
    ]
  },
  {
    id: 'nvidia-vs-amd',
    cat: '비교 분석',
    catColor: '#45A29E',
    date: '2026.02',
    readTime: '7분',
    title: 'NVIDIA vs AMD 2026 — 드라이버 안정성, 기능, 게이밍 성능 총정리',
    summary: '영원한 라이벌 NVIDIA RTX 40 시리즈와 AMD RX 7000 시리즈. 어느 쪽이 2026년 현재 더 나은 선택인지 다각도로 비교합니다.',
    sections: [
      {
        heading: 'NVIDIA의 강점 — DLSS 3와 레이트레이싱',
        body: `NVIDIA는 DLSS(Deep Learning Super Sampling) 기술에서 압도적인 선두를 달리고 있습니다. 특히 DLSS 3.5의 Frame Generation 기능은 AI를 이용해 실제 렌더링 프레임 사이에 새 프레임을 생성해, 성능이 낮은 GPU에서도 두 배 이상의 체감 fps를 제공합니다.

레이트레이싱 성능에서도 NVIDIA가 AMD를 크게 앞서고 있습니다. Cyberpunk 2077, Control 등 레이트레이싱 최적화 게임에서 동급 AMD 카드 대비 30~50% 이상 높은 성능을 보입니다. NVIDIA Studio 드라이버는 Adobe, DaVinci Resolve 등 크리에이터 앱에서의 안정성도 뛰어납니다.`
      },
      {
        heading: 'AMD의 강점 — 가성비와 오픈소스',
        body: `AMD는 가격 대비 성능에서 NVIDIA를 자주 앞섭니다. RX 7900 XTX는 RTX 4090 대비 70% 가격에 90% 이상의 래스터라이제이션 성능을 보여주며, RX 7800 XT는 QHD 게이밍 가성비 최강으로 평가받습니다.

AMD의 FSR(FidelityFX Super Resolution)은 DLSS와 달리 오픈소스로, AMD/NVIDIA/Intel 등 모든 GPU에서 작동합니다. FSR 3.0은 Frame Generation까지 지원하며 DLSS 3에 근접한 수준으로 발전했습니다.

Linux/오픈소스 환경에서는 AMD가 확실히 우위입니다. 오픈소스 Mesa 드라이버가 성숙해져 있어 안정적인 리눅스 게이밍을 원한다면 AMD를 추천합니다.`
      },
      {
        heading: 'Intel Arc — 신흥 강자의 부상',
        body: `Intel Arc는 초기 드라이버 불안정 문제를 극복하고 2024~2025년부터 본격적인 경쟁력을 갖추기 시작했습니다. 특히 Arc B580은 12GB VRAM과 합리적인 가격으로 미드레인지 시장에서 파란을 일으켰습니다.

Intel XeSS(Xe Super Sampling)는 DLSS처럼 AI 가속을 활용하며, 모든 GPU에서 작동하는 오픈소스 버전도 제공합니다. AV1 하드웨어 인코딩은 현재 모든 Arc GPU 중 최고 수준으로, 유튜브·트위치 스트리머에게 특히 유리합니다.`
      },
      {
        heading: '결론 — 누구에게 무엇을 추천하나?',
        body: `NVIDIA 선택: 최신 AAA 게임에서 DLSS 3 Frame Generation을 최대한 활용하고 싶은 분, 레이트레이싱을 즐기는 분, Adobe/DaVinci 등 크리에이터 앱을 메인으로 사용하는 분.

AMD 선택: 같은 예산에서 더 높은 래스터 성능과 VRAM을 원하는 분, Linux 게이밍 환경, Blender 등 오픈소스 툴 중심 워크로드.

Intel 선택: 12GB VRAM을 저렴하게 얻고 싶은 분, 스트리밍·동영상 편집 비중이 높은 분, 가성비 미드레인지를 원하는 분.`
      },
    ]
  },
  {
    id: 'fhd-top5',
    cat: '추천',
    catColor: '#ED1C24',
    date: '2026.02',
    readTime: '5분',
    title: 'FHD 144Hz 게이밍 종결 그래픽카드 TOP 5',
    summary: '1080p 해상도에서 144Hz 이상을 안정적으로 유지하려면 어떤 그래픽카드가 필요할까요? 가성비와 성능을 모두 고려한 최적의 선택 5가지.',
    sections: [
      {
        heading: '1위 — RTX 4060 Ti (42만원)',
        body: `FHD 144Hz 게이밍의 성능과 가격 균형점을 가장 잘 맞춘 제품입니다. DLSS 3 Frame Generation 덕분에 무거운 최신 게임에서도 144fps를 넘기기 훨씬 수월합니다. 165W의 저전력으로 발열과 소음도 최소화됩니다. VRAM이 8GB인 점이 유일한 단점이나, FHD에서는 대부분 충분합니다.`
      },
      {
        heading: '2위 — RX 7700 XT (38만원)',
        body: `12GB VRAM이 RTX 4060 Ti를 압도하는 핵심 강점입니다. FHD에서의 성능은 RTX 4060 Ti와 거의 동급이면서, 미래 게임 타이틀에 대한 VRAM 여유는 더 넉넉합니다. FSR 3 Frame Generation도 지원해 fps 부스트도 가능합니다.`
      },
      {
        heading: '3위 — Arc B580 (38만원)',
        body: `Intel이 야심 차게 내놓은 Battlemage 아키텍처의 미드레인지 카드입니다. 12GB GDDR6와 190W 전력 소모로 FHD 144Hz 게이밍에 충분하며, AV1 인코딩 성능은 동급 최강입니다. 게임 스트리머에게 특히 추천합니다.`
      },
      {
        heading: '4위 — RX 7600 XT (32만원)',
        body: `16GB VRAM이라는 믿기 어려운 스펙을 32만원에 제공합니다. 성능 자체는 상위 제품보다 다소 낮지만, VRAM 여유 덕분에 고해상도 텍스처 팩을 사용하는 게임이나 미래 타이틀에도 안심하고 사용할 수 있습니다.`
      },
      {
        heading: '5위 — RX 7600 (27만원)',
        body: `30만원 이하에서 FHD 144Hz를 원한다면 최선의 선택입니다. 최신 RDNA 3 아키텍처와 FSR 3 지원으로 성능 대비 가격이 가장 저렴한 FHD 게이밍 카드입니다. 가벼운 멀티 작업과 게이밍을 동시에 하는 일반 유저에게 강력 추천합니다.`
      },
    ]
  },
]

export default function GuideSection() {
  const [open, setOpen] = useState(ARTICLES[0].id)
  const article = ARTICLES.find(a => a.id === open)

  return (
    <section className="guide-page">
      <div className="guide-hero">
        <h1 className="guide-h1">
          <span className="guide-h1-label">심층 분석</span>
          <span className="guide-h1-main neon">구매 가이드</span>
        </h1>
        <p className="guide-desc">그래픽카드 구매 전에 꼭 읽어야 할 심층 가이드 시리즈. 예산별 추천부터 기술 비교까지 전문가 수준의 정보를 제공합니다.</p>
      </div>

      <div className="guide-layout">
        {/* 사이드바 — 글 목록 */}
        <aside className="guide-sidebar">
          {ARTICLES.map(a => (
            <button
              key={a.id}
              className={`guide-card${open === a.id ? ' guide-card--on' : ''}`}
              onClick={() => setOpen(a.id)}
            >
              <span className="guide-card-cat" style={{ color: a.catColor }}>{a.cat}</span>
              <span className="guide-card-title">{a.title}</span>
              <div className="guide-card-meta">
                <span>{a.date}</span>
                <span>·</span>
                <span>읽기 {a.readTime}</span>
              </div>
            </button>
          ))}
        </aside>

        {/* 본문 */}
        {article && (
          <article className="guide-article" key={article.id}>
            <div className="ga-header">
              <span className="ga-cat" style={{ color: article.catColor, borderColor: article.catColor }}>{article.cat}</span>
              <h2 className="ga-title">{article.title}</h2>
              <div className="ga-meta">
                <span className="mono">{article.date}</span>
                <span>·</span>
                <span>⏱ 읽기 {article.readTime}</span>
              </div>
              <p className="ga-summary">{article.summary}</p>
            </div>

            <div className="ga-body">
              {article.sections.map((s, i) => (
                <div key={i} className="ga-section">
                  <h3 className="ga-section-h">{s.heading}</h3>
                  {s.body.split('\n\n').map((para, j) => (
                    <p key={j} className="ga-para">{para}</p>
                  ))}
                </div>
              ))}
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
