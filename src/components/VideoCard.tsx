interface Video {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  duration: string;
  views: string;
  thumbnail: string;
}

interface Props {
  video: Video;
  onPlay: () => void;
}

export default function VideoCard({ video, onPlay }: Props) {
  return (
    <div
      onClick={onPlay}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all active:scale-[0.98]"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9' }}
    >
      <div className="relative">
        <img src={video.thumbnail} alt={video.title} className="w-full object-cover" style={{ height: '160px', background: '#E2E8F0' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.55)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <span className="absolute bottom-2 right-2 text-xs font-medium px-2 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.75)', color: '#fff' }}>
          {video.duration}
        </span>
        <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: '#FF0000', color: '#fff' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
          YouTube
        </span>
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold leading-snug mb-1.5" style={{ color: '#1E293B', fontFamily: 'var(--font-display)' }}>{video.title}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: '#64748B' }}>{video.subject}</span>
          <span style={{ color: '#CBD5E1' }}>·</span>
          <span className="text-xs" style={{ color: '#64748B' }}>{video.views} views</span>
        </div>
      </div>
    </div>
  );
}
