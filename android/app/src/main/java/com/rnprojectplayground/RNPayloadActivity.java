package com.rnprojectplayground;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

public class RNPayloadActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler{

    protected ReactRootView rootView;
    public String viewName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String pageName = getIntent().getStringExtra("pageName");
        viewName = pageName;

        Bundle paramsBundle = getIntent().getExtras();
        if (paramsBundle == null) {
            paramsBundle = new Bundle();
        }
        paramsBundle.putString("pageName", pageName);

        rootView = new ReactRootView(this);
        rootView.startReactApplication(
                MainApplication.reactInstanceManager,
                "RNProjectPlayground",
                paramsBundle
        );
        ReactActivityManager.pushActivity(this);
        setContentView(rootView);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        ReactActivityManager.removeActivity(this);
    }
}
