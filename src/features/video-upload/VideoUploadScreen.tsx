import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import uploadIcon from '../../assets/figma-upload/upload-icon.svg'
import './VideoUploadScreen.css'

type Skill = 'shooting' | 'passing' | 'defending' | 'ball-control' | 'crossing'
type CameraAngle = 'front' | 'side' | 'rear'
type AnalysisFocus = 'full-technique' | 'body-posture' | 'movement-timing'
type AnalysisStatus = 'idle' | 'analyzing' | 'complete' | 'error'

const analysisSteps = [
  'Detecting player',
  'Mapping body pose',
  'Comparing with reference',
  'Preparing feedback',
] as const
const analysisDurationMs = 10_000
const analysisErrorQuery = 'simulateAnalysisError'

const skills: ReadonlyArray<{ value: Skill; label: string }> = [
  { value: 'shooting', label: 'Shooting' },
  { value: 'passing', label: 'Passing' },
  { value: 'defending', label: 'Defending' },
  { value: 'ball-control', label: 'Ball Control' },
  { value: 'crossing', label: 'Crossing' },
]

const cameraAngles: ReadonlyArray<{ value: CameraAngle; label: string }> = [
  { value: 'front', label: 'Front' },
  { value: 'side', label: 'Side' },
  { value: 'rear', label: 'Rear' },
]

const analysisFocuses: ReadonlyArray<{ value: AnalysisFocus; label: string }> = [
  { value: 'full-technique', label: 'Full Technique' },
  { value: 'body-posture', label: 'Body Posture' },
  { value: 'movement-timing', label: 'Movement Timing' },
]

const maxFileSizeBytes = 500 * 1024 * 1024

function formatFileSize(sizeBytes: number): string {
  const megabytes = sizeBytes / (1024 * 1024)
  if (megabytes < 1) return `${Math.ceil(sizeBytes / 1024)} KB`
  return `${megabytes < 10 ? megabytes.toFixed(1) : Math.round(megabytes)} MB`
}

function formatDuration(durationSeconds: number): string {
  const totalSeconds = Math.floor(durationSeconds)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function VideoUploadScreen() {
  const { search: routerSearch } = useLocation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [durationLabel, setDurationLabel] = useState<string | null>(null)
  const [previewUnavailable, setPreviewUnavailable] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const [skill, setSkill] = useState<Skill>('shooting')
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>('side')
  const [analysisFocus, setAnalysisFocus] = useState<AnalysisFocus>('full-technique')
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle')
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const devErrorConsumedRef = useRef(false)
  const devErrorRunRef = useRef(false)

  useEffect(() => {
    if (!videoUrl) return
    return () => URL.revokeObjectURL(videoUrl)
  }, [videoUrl])

  useEffect(() => {
    if (analysisStatus !== 'analyzing') return

    const startedAt = performance.now()
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt
      const progress = Math.min(Math.floor((elapsed / analysisDurationMs) * 100), 100)
      setAnalysisProgress(progress)

      if (devErrorRunRef.current && progress >= 50) {
        window.clearInterval(timer)
        devErrorRunRef.current = false
        setAnalysisError('Analysis could not be completed. Please try again.')
        setAnalysisStatus('error')
        return
      }

      if (progress >= 100) {
        window.clearInterval(timer)
        setAnalysisStatus('complete')
      }
    }, 100)

    return () => window.clearInterval(timer)
  }, [analysisStatus])

  function openFilePicker() {
    fileInputRef.current?.click()
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ''
    if (!file) return

    setFileError(null)
    const extension = file.name.split('.').pop()?.toLowerCase()
    const isSupportedType =
      extension === 'mp4' ||
      extension === 'mov' ||
      file.type === 'video/mp4' ||
      file.type === 'video/quicktime'

    if (!isSupportedType) {
      setFileError('Choose an MP4 or MOV video file.')
      return
    }

    if (file.size > maxFileSizeBytes) {
      setFileError('Choose a video file no larger than 500 MB.')
      return
    }

    setSelectedFile(file)
    setAnalysisStatus('idle')
    setAnalysisProgress(0)
    setAnalysisError(null)
    setVideoUrl(URL.createObjectURL(file))
    setDurationLabel(null)
    setPreviewUnavailable(false)
  }

  function startAnalysis() {
    if (!selectedFile || analysisStatus === 'analyzing') return

    setAnalysisError(null)
    setAnalysisProgress(0)
    devErrorRunRef.current =
      import.meta.env.DEV &&
      !devErrorConsumedRef.current &&
      (new URLSearchParams(window.location.search).get(analysisErrorQuery) === '1' ||
        new URLSearchParams(routerSearch).get(analysisErrorQuery) === '1')
    if (devErrorRunRef.current) devErrorConsumedRef.current = true
    setAnalysisStatus('analyzing')
  }

  const stepperActiveIndex = analysisStatus === 'idle' ? 0 : 1

  return (
    <div className="upload-screen">
      <ol className="upload-stepper" aria-label="Video analysis steps">
        <li className={stepperActiveIndex === 0 ? 'is-active' : ''} aria-current={stepperActiveIndex === 0 ? 'step' : undefined}>1 Upload</li>
        <li className={stepperActiveIndex === 1 ? 'is-active' : ''} aria-current={stepperActiveIndex === 1 ? 'step' : undefined}>2 Analyze</li>
        <li>3 Compare</li>
        <li>4 Feedback</li>
      </ol>

      {fileError ? (
        <p className="upload-error" role="alert" id="upload-file-error">
          {fileError}
        </p>
      ) : null}

      <div className="upload-layout">
        {selectedFile && videoUrl ? (
          <section className="upload-zone upload-zone-selected" aria-label="Selected video">
            {previewUnavailable ? (
              <div className="upload-preview-unavailable" role="status">
                Video preview is unavailable in this browser. Your selected file remains available.
              </div>
            ) : (
              <video
                className="upload-video-preview"
                src={videoUrl}
                controls
                preload="metadata"
                aria-label={`Preview of ${selectedFile.name}`}
                onLoadedMetadata={(event) => {
                  const duration = event.currentTarget.duration
                  if (Number.isFinite(duration)) setDurationLabel(formatDuration(duration))
                }}
                onError={() => setPreviewUnavailable(true)}
              />
            )}
            <div className="upload-file-info">
              <div className="upload-file-copy">
                <span className="upload-file-name">{selectedFile.name}</span>
                <span className="upload-file-details">
                  {[durationLabel, formatFileSize(selectedFile.size), cameraAngles.find((item) => item.value === cameraAngle)?.label]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
              </div>
              <button className="upload-replace-button" type="button" onClick={openFilePicker}>
                Replace
              </button>
            </div>
            {analysisStatus !== 'idle' ? (
              <section className="analysis-progress-card" aria-labelledby="analysis-progress-title">
                <div className="analysis-progress-heading">
                  <h2 id="analysis-progress-title">Analyzing your technique</h2>
                  <span>{analysisProgress}%</span>
                </div>
                <div
                  className="analysis-progress-track"
                  role="progressbar"
                  aria-label="Analysis progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={analysisProgress}
                >
                  <span style={{ width: `${analysisProgress}%` }} />
                </div>
                {analysisStatus === 'error' ? (
                  <div className="analysis-error" role="alert">
                    <p>{analysisError}</p>
                    <button className="analysis-retry-button" type="button" onClick={startAnalysis}>
                      Retry
                    </button>
                  </div>
                ) : (
                  <ol className="analysis-progress-steps" aria-label="Analysis stages">
                    {analysisSteps.map((step, index) => {
                      const completed = analysisStatus === 'complete' || analysisProgress >= (index + 1) * 25
                      const active = analysisStatus === 'analyzing' && !completed && analysisProgress >= index * 25
                      return (
                        <li className={completed ? 'is-complete' : active ? 'is-active' : ''} key={step}>
                          <span className="analysis-step-indicator" aria-hidden="true">
                            {completed ? '✓' : active ? '◐' : '○'}
                          </span>
                          <span>{step}</span>
                        </li>
                      )
                    })}
                  </ol>
                )}
                <p className="analysis-demo-disclaimer">Illustrative analysis — demo data only</p>
                {analysisStatus === 'complete' ? (
                  <Link className="analysis-comparison-link" to="/analysis-workspace">
                    View Comparison
                  </Link>
                ) : null}
              </section>
            ) : null}
          </section>
        ) : (
          <section className="upload-zone upload-zone-empty" aria-labelledby="upload-empty-title">
            <span className="upload-icon-wrap" aria-hidden="true">
              <img src={uploadIcon} alt="" />
            </span>
            <h2 id="upload-empty-title">Upload Your Training Video</h2>
            <p className="upload-intro">
              Select a recorded training clip. For best results keep the camera steady and your full body in frame.
            </p>
            <div className="upload-empty-actions">
              <button className="upload-button upload-button-primary" type="button" onClick={openFilePicker}>
                Browse Files
              </button>
              <button
                className="upload-button upload-button-secondary"
                type="button"
                disabled
                aria-describedby="sample-video-unavailable"
              >
                Try Sample Video
              </button>
            </div>
            <p className="upload-supported-types">MP4 or MOV · up to 500 MB</p>
            <p className="upload-unavailable-note" id="sample-video-unavailable">
              Sample video is not currently available.
            </p>
          </section>
        )}

        <aside className="upload-settings" aria-labelledby="upload-settings-title">
          <h2 id="upload-settings-title">Analysis settings</h2>
          <div className="upload-setting-group">
            <label htmlFor="upload-skill">Skill</label>
            <select id="upload-skill" value={skill} onChange={(event) => setSkill(event.target.value as Skill)}>
              {skills.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <fieldset className="upload-setting-group upload-segment-fieldset">
            <legend>Camera angle</legend>
            <div className="upload-segment-control">
              {cameraAngles.map((item) => (
                <button
                  className={cameraAngle === item.value ? 'is-selected' : ''}
                  key={item.value}
                  type="button"
                  aria-pressed={cameraAngle === item.value}
                  onClick={() => setCameraAngle(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="upload-setting-group upload-segment-fieldset">
            <legend>Analysis focus</legend>
            <div className="upload-segment-control upload-focus-control">
              {analysisFocuses.map((item) => (
                <button
                  className={analysisFocus === item.value ? 'is-selected' : ''}
                  key={item.value}
                  type="button"
                  aria-pressed={analysisFocus === item.value}
                  onClick={() => setAnalysisFocus(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="upload-settings-spacer" />
          <button
            className="upload-button upload-button-primary upload-analyze-button"
            type="button"
            disabled={!selectedFile || analysisStatus === 'analyzing' || analysisStatus === 'error'}
            aria-describedby={!selectedFile ? 'analysis-unavailable' : undefined}
            onClick={startAnalysis}
          >
            {analysisStatus === 'analyzing' ? 'Analyzing…' : 'Analyze Video'}
          </button>
          {!selectedFile ? (
            <p className="upload-unavailable-note" id="analysis-unavailable">
              Select a valid video to start analysis.
            </p>
          ) : null}
        </aside>
      </div>

      <input
        ref={fileInputRef}
        className="upload-file-input"
        type="file"
        accept=".mp4,.mov,video/mp4,video/quicktime"
        aria-label="Choose an MP4 or MOV video"
        tabIndex={-1}
        onChange={handleFileChange}
      />
    </div>
  )
}
