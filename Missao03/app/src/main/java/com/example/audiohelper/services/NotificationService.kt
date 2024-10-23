package com.example.audiohelper.services

import android.app.Notification
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification

class NotificationService : NotificationListenerService() {

    private val notifications = mutableListOf<String>()

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        val notification: Notification = sbn.notification ?: return
        notifications.add(notification.extras.getString(Notification.EXTRA_TITLE, "Nova Notificação"))
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification) {
    }

    fun getNotifications(): List<String> {
        return notifications
    }
}
