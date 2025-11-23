// Fallback components for when 3D animations fail

export function ThreeDCardFallback({ color = '#06b6d4', style = {} }) {
  return (
    <div 
      style={{
        width: style.width || '100px',
        height: style.height || '100px',
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${color}40, ${color}80)`,
        border: `2px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 20px ${color}40`,
        animation: 'pulse 2s ease-in-out infinite',
        ...style
      }}
    >
      <div 
        style={{
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: color,
          opacity: 0.6
        }}
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export function ThreeDSceneFallback({ style = {} }) {
  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      <div 
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #06b6d440, #a855f780)',
          border: '2px solid #06b6d4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
          animation: 'rotate 3s linear infinite'
        }}
      >
        <div 
          style={{
            width: '60%',
            height: '60%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
            opacity: 0.7
          }}
        />
      </div>
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function ThreeDBackgroundFallback({ style = {} }) {
  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.1), transparent 50%), radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.1), transparent 50%)',
        zIndex: -1,
        pointerEvents: 'none',
        ...style
      }}
    />
  );
}

