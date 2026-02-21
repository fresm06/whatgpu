import { useState } from 'react'
import './FAQ.css'

const FAQS = [
  {
    q: '그래픽카드 교체 시 파워서플라이도 함께 교체해야 하나요?',
    a: `반드시 그렇지는 않지만, 새 그래픽카드의 TDP(소비 전력)에 따라 교체가 필요할 수 있습니다. 일반적으로 파워서플라이의 출력이 PC 전체 소비 전력의 약 1.5~2배여야 안정적입니다.

예를 들어 RTX 4060(TDP 115W) + 라이젠 5 CPU(65W) 조합이라면 총 200W 정도이므로 400~500W 파워면 충분합니다. 반면 RTX 4090(TDP 450W) + 고성능 CPU라면 850W 이상을 권장합니다.

80 PLUS 인증 파워를 선택하고 커넥터 호환성(16핀 ATX 3.0 등)도 확인하세요.`,
  },
  {
    q: 'VRAM이 부족하면 어떤 증상이 발생하나요?',
    a: `VRAM 부족 시 나타나는 증상은 다음과 같습니다:

① 텍스처 팝핑 — 고해상도 텍스처가 뒤늦게 로딩되거나 저품질로 표시됩니다.
② 급격한 fps 드롭 — 시스템 RAM을 VRAM 대신 사용하면서 성능이 절반 이하로 떨어집니다.
③ 게임 크래시 — 메모리 오버플로우가 심하면 게임이 강제 종료됩니다.
④ 버벅임(Stutter) — 프레임이 규칙적으로 끊기는 현상.

설정에서 텍스처 품질을 낮추거나, 해상도를 내리는 것이 임시 해결책입니다.`,
  },
  {
    q: '배틀그라운드(PUBG)에서 144Hz를 방어하려면 어떤 그래픽카드가 필요한가요?',
    a: `배그는 CPU 성능에도 크게 의존하지만, FHD(1080p) 144fps 안정을 위한 GPU 기준은 다음과 같습니다:

• 낮음~중간 설정: RTX 3060 / RX 6600 이상
• 울트라 설정 FHD 144fps+: RTX 4060 Ti / RX 7700 XT 이상
• QHD(1440p) 144fps+: RTX 4070 / RX 7800 XT 이상

배그는 CPU 병목이 심한 게임으로, GPU가 아무리 좋아도 CPU가 구형(4코어 이하)이면 fps가 제한됩니다. 라이젠 5 5600X / 인텔 코어 i5-12600K 이상과 함께 사용하는 것을 권장합니다.`,
  },
  {
    q: 'RTX와 GTX의 차이는 무엇인가요?',
    a: `RTX(Ray Tracing Texel eXtreme)는 GTX의 후속 세대로, 2018년 RTX 20 시리즈부터 도입됐습니다. 주요 차이점은 다음과 같습니다:

• 레이트레이싱 전용 코어(RT Core): 광선 추적 기술을 하드웨어 가속하여 실제 빛 반사·굴절·그림자를 계산합니다.
• AI 가속(Tensor Core): DLSS, DLAA 등 AI 기반 초해상도·프레임 생성 기술 지원.
• DLSS 지원: GTX는 DLSS 1.0(제한적)만 지원하며 RTX는 DLSS 2.0 이상 지원.
• AV1 인코딩: RTX 30 시리즈 이상에서 지원.

현재 GTX 시리즈는 더 이상 신제품이 출시되지 않으며, 구형 중고 제품으로만 구할 수 있습니다.`,
  },
  {
    q: 'DLSS, FSR, XeSS — 초해상도 기술 비교',
    a: `세 기술 모두 낮은 해상도로 렌더링한 뒤 AI/알고리즘으로 고해상도로 업스케일하여 성능을 높이는 기술입니다.

• DLSS 3.5 (NVIDIA): AI(Tensor Core)로 업스케일. 화질이 가장 뛰어나고 Frame Generation 지원. NVIDIA GPU 전용.
• FSR 3 (AMD): 오픈소스 알고리즘 기반. 모든 GPU에서 작동. DLSS보다 화질은 다소 낮지만 호환성 최고. Frame Generation 지원.
• XeSS 2 (Intel): AI 가속 지원 GPU(Arc)에서는 DLSS급 화질, 비지원 GPU에서는 FSR 수준. 오픈소스 버전도 제공.

어떤 기술이 더 낫느냐보다, 자신의 GPU가 지원하는 기술을 활용하는 것이 중요합니다.`,
  },
  {
    q: '그래픽카드 드라이버는 얼마나 자주 업데이트해야 하나요?',
    a: `일반적으로 신작 게임 출시 시 해당 게임에 맞춘 최적화 드라이버가 함께 나오므로, 새 게임을 시작하기 전에 업데이트하는 것이 좋습니다.

• NVIDIA: GeForce Experience 앱에서 자동 업데이트 설정 가능. 게임 레디 드라이버(Game Ready Driver)와 스튜디오 드라이버(크리에이터용) 중 선택.
• AMD: Adrenalin 소프트웨어에서 관리. 주기적 Recommended/Optional 업데이트.
• Intel Arc: Intel Arc Control에서 관리.

단, 새 드라이버가 특정 게임에서 버그를 일으키는 경우도 있으므로, 안정적으로 작동 중인 환경이라면 무리하게 업데이트할 필요는 없습니다.`,
  },
  {
    q: '레이트레이싱을 켜면 성능이 얼마나 저하되나요?',
    a: `레이트레이싱은 기존 래스터라이제이션보다 훨씬 많은 계산이 필요합니다. 게임과 설정에 따라 다르지만 대략적인 성능 저하 수치는 다음과 같습니다:

• 낮은 RT 설정: 약 15~25% fps 감소
• 중간 RT 설정: 약 30~45% fps 감소
• 울트라 RT (패스 트레이싱): 약 50~70% fps 감소

DLSS 3 Frame Generation을 함께 사용하면 RT 성능 저하를 상당 부분 만회할 수 있습니다. 현실적으로 레이트레이싱을 켜고 60fps 이상을 유지하려면 RTX 4070 급 이상을 권장합니다.`,
  },
  {
    q: '4K 게이밍을 하려면 어떤 그래픽카드가 필요한가요?',
    a: `4K(3840x2160) 해상도는 FHD 대비 4배의 픽셀을 렌더링해야 하므로 고사양 GPU가 필요합니다.

• 4K 60fps (캐주얼): RTX 4070 Super / RX 7900 GRE 이상
• 4K 60fps (최고 설정): RTX 4080 / RX 7900 XT 이상
• 4K 120fps+: RTX 4090 / RX 7900 XTX

단, DLSS 4K나 FSR 4K를 사용하면 실제 4K 해상도를 렌더링하지 않고도 4K에 가까운 화질을 얻을 수 있어, RTX 4070 Ti급에서도 4K 게이밍이 실용적으로 가능합니다.

4K 120Hz 이상을 목표로 한다면 반드시 DisplayPort 2.1 또는 HDMI 2.1 케이블과 호환 모니터도 함께 준비해야 합니다.`,
  },
  {
    q: '중고 그래픽카드 구매 시 주의사항은 무엇인가요?',
    a: `중고 그래픽카드 구매 시 아래 사항을 반드시 확인하세요:

① 마이닝(채굴) 사용 여부: 채굴에 사용된 GPU는 24시간 풀로드 상태가 지속되어 수명이 단축됩니다. 팬 베어링 상태, 서멀 패드 상태 등을 확인하세요.
② 직거래 시 테스트 필수: Heaven 벤치마크 15분 이상 구동 후 화면 이상(아티팩트, 픽셀 깨짐)이 없는지 확인.
③ 드라이버 재설치: 구매 후 반드시 기존 드라이버 완전 삭제(DDU 사용) 후 최신 드라이버 설치.
④ 보증 여부: 제조사 보증이 남아있는지 확인(A/S 이력 포함).
⑤ 가격 비교: 다나와 중고 시세와 당근마켓·번개장터 시세를 비교해 적정가를 파악하세요.`,
  },
  {
    q: '그래픽카드 수명은 얼마나 되나요?',
    a: `정상적인 사용 환경에서 그래픽카드의 평균 수명은 5~10년 정도입니다. 다만 실제 사용 가능 수명은 여러 요인에 따라 달라집니다.

• 발열 관리: GPU 온도를 85°C 이하로 유지하는 것이 수명 연장의 핵심입니다. 서멀 패드와 서멀 구리스를 3~5년 주기로 교체해 주세요.
• 전압 안정성: 불안정한 파워서플라이는 GPU를 조기에 망가뜨릴 수 있습니다. 인증 파워를 사용하세요.
• 채굴 이력: 24/7 풀로드 사용은 수명을 크게 단축합니다.
• 팬 수명: 팬 베어링이 마모되면 교체해야 합니다. 팬만 별도 구매해 교체 가능합니다.

최신 GPU는 성능이 빠르게 발전하므로, 물리적 수명보다 "시대에 뒤처지는" 시점이 먼저 찾아올 수 있습니다.`,
  },
  {
    q: '그래픽카드 오버클럭은 안전한가요?',
    a: `MSI Afterburner 같은 도구로 GPU 코어 클럭과 메모리 클럭을 올릴 수 있습니다. 적절한 오버클럭은 안전하지만 몇 가지 주의가 필요합니다.

• 전압 증가 없는 오버클럭: GPU 부스트 클럭을 100~200MHz 올리는 정도는 대부분 안전합니다.
• 온도 모니터링: MSI Afterburner의 OSD(온스크린 디스플레이)로 온도를 실시간 확인하며 진행.
• 단계적으로 올리기: 한 번에 많이 올리지 말고 50MHz씩 천천히 올려 안정성을 테스트.
• 파워 리밋 제한: 파워를 무리하게 늘리면 GPU 수명에 영향을 줄 수 있습니다.

과도한 오버클럭은 화면 깨짐, 크래시, 심한 경우 GPU 손상을 유발할 수 있으므로 적절한 범위 내에서 즐기는 것이 좋습니다.`,
  },
  {
    q: 'PCIe 4.0 vs PCIe 5.0 — 실제 게이밍 성능에 차이가 있나요?',
    a: `결론부터 말하면, 현재(2026년 기준) 게이밍에서 PCIe 3.0, 4.0, 5.0 간 실질적인 fps 차이는 거의 없습니다.

최신 GPU도 PCIe 3.0 x16의 대역폭을 게임 중에는 꽉 채우지 못하기 때문에, PCIe 4.0이나 5.0으로 업그레이드해도 게이밍 fps 향상은 1~2% 수준에 불과합니다.

다만 PCIe 5.0 SSD(M.2 슬롯)의 경우 PCIe 5.0 레인을 사용하므로, 스토리지 성능에서는 세대 차이가 나타납니다. 그래픽카드 자체의 PCIe 버전은 현재로서는 크게 신경 쓰지 않아도 됩니다.`,
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  const toggle = (i) => setOpenIdx(prev => prev === i ? null : i)

  return (
    <section className="faq-page">
      <div className="faq-hero">
        <h1 className="faq-h1">
          <span className="faq-h1-label">자주 묻는 질문</span>
          <span className="faq-h1-main neon">FAQ</span>
        </h1>
        <p className="faq-desc">그래픽카드 구매·사용 시 가장 많이 묻는 질문들을 모았습니다. 구매 전 꼭 읽어보세요.</p>
      </div>

      <div className="faq-list" role="list">
        {FAQS.map((item, i) => (
          <div key={i} className={`faq-item${openIdx === i ? ' faq-item--open' : ''}`} role="listitem">
            <button
              className="faq-q"
              onClick={() => toggle(i)}
              aria-expanded={openIdx === i}
            >
              <span className="faq-num mono">Q{String(i + 1).padStart(2, '0')}</span>
              <span className="faq-q-text">{item.q}</span>
              <span className="faq-arrow">{openIdx === i ? '▲' : '▼'}</span>
            </button>
            {openIdx === i && (
              <div className="faq-a">
                {item.a.split('\n\n').map((p, j) => (
                  <p key={j} className="faq-a-para">{p}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </section>
  )
}
