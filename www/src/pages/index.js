/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function Home() {
  return (
    <Layout description="A JavaScript dxf generator written in TypeScript.">
      <header
        className={clsx('hero', styles.heroBanner)}
        style={{backgroundColor: '#2b3137'}}>
        <div className="container">
          <h1
            className="hero__title"
            style={{
              maxWidth: '1100px',
              color: 'white',
              gap: '20px',
            }}>
            <img alt="dxf" src="_media/logo.svg" />
            <span>
              A JavaScript <b style={{color: '#25C2A5'}}>dxf</b> generator
              written in TypeScript.
            </span>
          </h1>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--primary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  );
}
