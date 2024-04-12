// @flow
import React from 'react';
import _ from 'lodash';
import styled, { ThemeContext } from 'styled-components';

export type Context = {
  radius: string,
  centerRadius: string,
  centralAngle: number,
  polar: boolean,
};

//slice.contentContainer
const ContentContainer = styled.div<{contentHeight: string}>`
`;

//slice.content
const Content = styled.div`
`;

//slice.container
const Container = styled.div<{_highlight: boolean}>`
`;

type Callback = (event: React.SyntheticEvent<*>) => void;

type Props = {
  className: string,
  contentHeight: string,
  onMouseEnter: Callback,
  onMouseOver: Callback,
  onMouseOut: Callback,
  onSelect: Callback,
  onKeyDown: Callback,
  onFocus: Callback,
  onBlur: Callback,
  attrs: {},
  children: React.ReactNode,
} & Context;

const Slice = ({
  className,
  contentHeight = '2em',
  onMouseEnter,
  onMouseOver,
  onMouseOut,
  onSelect,
  onKeyDown,
  onFocus,
  onBlur,
  children,
  attrs = {},
}: Props) => {
  const { context: { active } } = React.useContext(ThemeContext)!;
  const getCallback = (callback?: Callback) => (
    active && callback ? _.debounce(callback) : undefined
  );
  return (
    <Container
      {...attrs}
      role="button"
      className={className}
      onMouseEnter={getCallback(onMouseEnter)}
      onMouseOver={getCallback(onMouseOver)}
      onMouseOut={getCallback(onMouseOut)}
      onClick={getCallback(onSelect)}
      onKeyDown={getCallback(onKeyDown)}
      onFocus={getCallback(onFocus)}
      onBlur={onBlur}
      _highlight={active ? active.toString() : undefined}
      tabIndex={-1}
    >
      <ContentContainer
        contentHeight={contentHeight}
      >
        <Content>
          {children}
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default Slice