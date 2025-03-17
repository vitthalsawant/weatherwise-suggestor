
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import FadeIn from './transitions/FadeIn';

const Settings = () => {
  return (
    <section className="mb-8">
      <FadeIn delay={300}>
        <div className="glass-card overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-display font-semibold mb-6">Settings</h3>
            
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="units">Units</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark mode for the application</p>
                  </div>
                  <Switch id="dark-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-refresh" className="font-medium">Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">Automatically refresh weather data</p>
                  </div>
                  <Switch id="auto-refresh" defaultChecked />
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weather-alerts" className="font-medium">Weather Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for severe weather</p>
                  </div>
                  <Switch id="weather-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="daily-forecast" className="font-medium">Daily Forecast</Label>
                    <p className="text-sm text-muted-foreground">Get daily forecast notifications</p>
                  </div>
                  <Switch id="daily-forecast" />
                </div>
              </TabsContent>
              
              <TabsContent value="units" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="celsius" className="font-medium">Temperature Unit</Label>
                    <p className="text-sm text-muted-foreground">Choose between Celsius and Fahrenheit</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="celsius">°C</Label>
                    <Switch id="celsius" defaultChecked />
                    <Label htmlFor="celsius">°F</Label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="wind-unit" className="font-medium">Wind Speed Unit</Label>
                    <p className="text-sm text-muted-foreground">Choose your preferred wind speed unit</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="wind-unit">km/h</Label>
                    <Switch id="wind-unit" defaultChecked />
                    <Label htmlFor="wind-unit">mph</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default Settings;
