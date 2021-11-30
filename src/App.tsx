import React from "react";
import {
  ContextualMenu,
  IContextualMenuProps,
  Checkbox,
  DefaultButton,
  IconButton,
  IIconProps,
  Stack,
  IStackStyles,
  IStackTokens,
  Panel,
  PanelType,
  ThemeProvider,
  initializeIcons,
  createTheme,
  DefaultEffects,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import styled from "styled-components";
import { ladumaTheme } from "./theme";

// Initialize icons in case this example uses them
initializeIcons();

const ladTheme = createTheme(ladumaTheme);

const themedLargeStackTokens: IStackTokens = {
  childrenGap: "l1",
  padding: "s",
};

const stackStyles: IStackStyles = {
  root: {
    background: ladTheme.palette.white,
    marginBottom: "2rem",
  },
};
const Card = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${ladTheme.palette.themePrimary};
  box-shadow: ${DefaultEffects.elevation16};
  color: ${ladTheme.palette.white};
  height: 60px;
  width: 60px;
`;

const navIcon: IIconProps = { iconName: "GlobalNavButton" };

const Trigger = styled.div`
  box-shadow: ${DefaultEffects.elevation8};
  background: ${ladTheme.palette.white};
  position: fixed;
  left: 1rem;
  top: 50%;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  overflow: hidden;
`;

const menuProps: IContextualMenuProps = {
  // For example: disable dismiss if shift key is held down while dismissing
  onDismiss: (ev) => {
    if (ev && "shiftKey" in ev) {
      ev.preventDefault();
    }
  },
  items: [
    {
      key: "manageDevices",
      text: "Manage Devices",
      iconProps: { iconName: "Devices2" },
    },
    {
      key: "leaveMeeting",
      text: "Leave Meeting",
      iconProps: { iconName: "Leave" },
    },
  ],
  directionalHintFixed: true,
};

const addIcon: IIconProps = { iconName: "SetAction" };

export const App: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  const _getMenu = (props: IContextualMenuProps): JSX.Element => {
    // Customize contextual menu with menuAs
    return <ContextualMenu {...props} />;
  };

  const _onMenuClick = (ev?: React.SyntheticEvent<any>) => {
    console.log(ev);
  };

  return (
    <div>
      <ThemeProvider theme={ladTheme}>
        <Trigger>
          <IconButton iconProps={navIcon} title="Menu" ariaLabel="Menu" onClick={openPanel} />
        </Trigger>
        <Panel
          isOpen={isOpen}
          type={PanelType.customNear}
          onDismiss={dismissPanel}
          isLightDismiss
          hasCloseButton={false}
          customWidth="300px"
        >
          <Stack>
            <h1>Meeting</h1>
            <Stack>
              <h3>Whiteboards</h3>
              <Stack horizontal styles={stackStyles} tokens={themedLargeStackTokens}>
                <Card>1</Card>
                <Card>2</Card>
                <Card>3</Card>
              </Stack>
            </Stack>
            <Stack styles={stackStyles}>
              <h3>Shared Content</h3>
              <Stack horizontal styles={stackStyles} tokens={themedLargeStackTokens}>
                <Card>1</Card>
                <Card>2</Card>
                <Card>3</Card>
              </Stack>
            </Stack>
            {/* <Stack styles={stackStyles}>
              <Checkbox
                label="Unchecked checkbox"
                onChange={() => {
                  alert("Hello");
                }}
              />
            </Stack> */}
            <Stack>
              <DefaultButton
                text="Actions"
                iconProps={addIcon}
                menuProps={menuProps}
                // Optional callback to customize menu rendering
                menuAs={_getMenu}
                // Optional callback to do other actions (besides opening the menu) on click
                onMenuClick={_onMenuClick}
                // By default, the ContextualMenu is re-created each time it's shown and destroyed when closed.
                // Uncomment the next line to hide the ContextualMenu but persist it in the DOM instead.
                // persistMenu={true}
                allowDisabledFocus
                // disabled={disabled}
                // checked={checked}
              />
            </Stack>
          </Stack>
        </Panel>
      </ThemeProvider>
    </div>
  );
};
