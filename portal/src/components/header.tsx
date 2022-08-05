import { css } from "@emotion/react";

export const Header = () => {
    return <div css={css`
        width: 100vw;
        height: 48px;
        background-color: #f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: 400;
        font-family: 'PingFang SC', sans-serif;
    `}>
        Header
    </div>;
};

