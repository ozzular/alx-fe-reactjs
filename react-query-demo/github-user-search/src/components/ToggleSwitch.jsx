import PropTypes from 'prop-types';

const ToggleSwitch = ({ 
  isOn, 
  onToggle, 
  onLabel = "Advanced", 
  offLabel = "Basic",
  size = "medium" 
}) => {
  const sizeClasses = {
    small: {
      container: "w-12 h-6",
      toggle: "w-5 h-5",
      translate: "translate-x-6"
    },
    medium: {
      container: "w-14 h-7",
      toggle: "w-6 h-6",
      translate: "translate-x-7"
    },
    large: {
      container: "w-16 h-8",
      toggle: "w-7 h-7",
      translate: "translate-x-8"
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Off Label */}
      <span className={`text-sm font-medium transition-colors duration-200 ${
        !isOn ? 'text-blue-600' : 'text-gray-500'
      }`}>
        {offLabel}
      </span>

      {/* Toggle Switch */}
      <button
        onClick={onToggle}
        className={`${currentSize.container} relative inline-flex items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isOn 
            ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-lg' 
            : 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg'
        }`}
        role="switch"
        aria-checked={isOn}
        aria-label={`Switch to ${isOn ? offLabel : onLabel} mode`}
      >
        {/* Toggle Circle */}
        <span
          className={`${currentSize.toggle} inline-block transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
            isOn ? currentSize.translate : 'translate-x-0.5'
          }`}
        >
          {/* Inner Icon */}
          <span className="flex items-center justify-center w-full h-full">
            {isOn ? (
              // Advanced Search Icon
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            ) : (
              // Basic Search Icon
              <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </span>
        </span>

        {/* Animated Background Glow */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          isOn 
            ? 'bg-green-400 opacity-20 animate-pulse' 
            : 'bg-blue-400 opacity-20 animate-pulse'
        }`} />
      </button>

      {/* On Label */}
      <span className={`text-sm font-medium transition-colors duration-200 ${
        isOn ? 'text-green-600' : 'text-gray-500'
      }`}>
        {onLabel}
      </span>
    </div>
  );
};

ToggleSwitch.propTypes = {
  isOn: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onLabel: PropTypes.string,
  offLabel: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default ToggleSwitch;
