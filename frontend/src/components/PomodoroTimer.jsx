import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX } from 'lucide-react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'
  const [customTime, setCustomTime] = useState(25);
  const [isEditing, setIsEditing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Audio for beep sound
  const audioRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'));

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            if (soundEnabled) {
              audioRef.current.play().catch(e => console.log('Audio play failed:', e));
            }
            // Switch modes
            if (mode === 'focus') {
              setMode('break');
              setMinutes(5);
            } else {
              setMode('focus');
              setMinutes(customTime);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode, customTime, soundEnabled]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setMode('focus');
    setMinutes(customTime);
    setSeconds(0);
  };

  const handleTimeChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0 && val <= 120) {
      setCustomTime(val);
      if (mode === 'focus') setMinutes(val);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Pomodoro Timer</h3>
        <div className="flex gap-2">
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-gray-400 hover:text-primary transition-colors">
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsEditing(!isEditing)} className="text-gray-400 hover:text-primary transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setMode('focus'); setMinutes(customTime); setSeconds(0); setIsActive(false); }}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${mode === 'focus' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          Focus
        </button>
        <button
          onClick={() => { setMode('break'); setMinutes(5); setSeconds(0); setIsActive(false); }}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${mode === 'break' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          Break
        </button>
      </div>

      {isEditing ? (
        <div className="mb-6 flex flex-col items-center animate-fadeIn">
          <label className="text-xs text-gray-500 mb-1">Focus Duration (min)</label>
          <input
            type="number"
            value={customTime}
            onChange={handleTimeChange}
            className="w-20 text-center text-2xl font-mono border rounded-lg p-1 focus:border-primary outline-none"
            min="1"
            max="120"
          />
          <button 
            onClick={() => setIsEditing(false)}
            className="text-xs text-primary mt-2 hover:underline"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="text-5xl font-mono font-bold text-gray-900 mb-6 tabular-nums tracking-wider">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className="p-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 active:scale-95"
        >
          {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors active:scale-95"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
