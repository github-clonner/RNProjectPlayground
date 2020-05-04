/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "CJNavigation.h"
#import "ReactRootViewManager.h"
#import "RNPayloadViewController.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RNPayloadViewController *rootVC = [[RNPayloadViewController alloc] initWithPageName:@"main_tab"
                                                                               params:nil];
  UINavigationController *unv = [[UINavigationController alloc] initWithRootViewController:rootVC];
  unv.navigationBarHidden = YES;
  unv.interactivePopGestureRecognizer.delegate = nil;
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.navigationController = unv;
  self.window.rootViewController = unv;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
