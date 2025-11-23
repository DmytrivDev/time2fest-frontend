import React, { useState } from 'react';
import styles from './auth.module.scss';
import clsx from 'clsx';

export default function LoginPage() {
  return (
    <div className={clsx(styles.section, styles.full)}>
      <div className="container">
        <section className={styles.profileSlider}>
          <div
            className={clsx(styles.slider, styles.sliderLoading, 'loading')}
          ></div>
        </section>
        <section className={styles.profileSub}>
          <div
            className={clsx(
              styles.subscribe,
              styles.subscribeLoading,
              'loading'
            )}
          ></div>
        </section>
      </div>
    </div>
  );
}
