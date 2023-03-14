import { Stack } from 'office-ui-fabric-react';
import React, { useMemo } from 'react';
import ToggleOff from './Assets/toggle-off.svg';
import ToggleOn from './Assets/toggle-on.svg';

const getStyles = (disabled: boolean): any => ({
    toggle: {
        height: 30
    },
    label: {
        fontSize: 14,
        fontWeight: 600,
        opacity: disabled ? 0.5 : 1
    }
});

interface CustomToggleProps {
  isToggled: boolean;
  label: string;
  onChange: () => void;
  disabled?: boolean;
}

export const CustomToggle: React.FunctionComponent<CustomToggleProps> = ({ isToggled, label, onChange, disabled = false }) => {
  const styles = useMemo(() => getStyles(disabled), []);

  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <span style={styles.label}>{label}</span>
        <img style={styles.toggle} src={isToggled ? ToggleOn : ToggleOff} alt="toggle" onClick={() => {
            if (!disabled) {
                onChange()
        }}} />
    </Stack>
  );
};
