import { ThemedSafeView } from '@/components/ThemedSafeView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from '@/providers/AuthProvider';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const { isAnonymous, user, convertAnonymousToAccount, verifyUser, signOut } = useAuth()

  const [saveable, setSaveable] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [email, setEmail] = useState(user ? user.email : '')
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')

  const textColor = useThemeColor({}, 'text')
  const buttonColor = useThemeColor({}, 'tint')
  const bgColor = useThemeColor({}, 'background')
  const disabledButtonColor = useThemeColor({}, 'icon')

  useEffect(() => {
    if (!isAnonymous) {
      setSaveable(false)
    } else {
      setSaveable(email != '' || otp != '')
    }
  }, [email, otp])

  async function createAccount() {
    setSaveable(false)
    setMessage('')

    if (!showOtp) {
      const { status, message } = await convertAnonymousToAccount(email)

      console.log(status, message)

      if (status == 'otp') setShowOtp(true)
      if (message) setMessage(message)
    } else {
      const resp = await verifyUser(email, otp)
      if (resp != 'Success') setMessage('There was an error.')
    }

    setSaveable(true)
  }

  return (
    <ThemedSafeView style={styles.page}>
      <View style={styles.page}>
        <ThemedText>
          You're logged in {isAnonymous && <ThemedText style={{ fontWeight: 'bold' }}>Anonymously</ThemedText>}
        </ThemedText>
        {isAnonymous && <ThemedText type='small'>
          Your data is only available via this device. To access from multiple devices or restore access if you get logged out, please finish setting up your account.
        </ThemedText>}
        <ThemedView colorName='backgroundSecondary' style={{ height: 1 }} />
        {isAnonymous
          ? <ThemedView lightColor='#F2F0E5' darkColor='#1C1B1A' style={styles.container}>
            <TextInput
              placeholder='Email'
              style={[styles.text, { fontWeight: 'bold', color: textColor }]}
              value={email}
              onChangeText={setEmail}
              autoComplete='email'
              autoCapitalize='none'
              readOnly={showOtp}
            />
            {showOtp && <TextInput
              placeholder='OTP'
              style={[styles.text, { color: textColor }]}
              value={otp}
              onChangeText={setOtp}
            />}
          </ThemedView>
          : <ThemedView lightColor='#F2F0E5' darkColor='#1C1B1A' style={styles.container}>
            <TextInput
              placeholder='Email'
              style={[styles.text, { fontWeight: 'bold', color: textColor }]}
              value={email}
              onChangeText={setEmail}
              readOnly={!isAnonymous}
            />
          </ThemedView>
        }
        {message != '' && <ThemedText type='small'>
          {message}
        </ThemedText>}
        <View style={styles.buttonRow}>
          {isAnonymous && <TouchableOpacity
            style={[styles.button, { backgroundColor: saveable ? buttonColor : disabledButtonColor }]}
            onPress={createAccount}
            disabled={!saveable}
          >
            <ThemedText type='small' style={{ color: bgColor }}>{showOtp ? 'Verify Email' : 'Create or Sign In'}</ThemedText>
          </TouchableOpacity>}
        </View>
        <ThemedView colorName='backgroundSecondary' style={{ height: 1 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity>
            <ThemedText type='small' darkColor='#D14D41' lightColor='#AF3029'>
              Delete Account
            </ThemedText>
          </TouchableOpacity>
          {!isAnonymous && <TouchableOpacity onPress={signOut}>
            <ThemedText type='small' darkColor='#D14D41' lightColor='#AF3029'>
              Log Out
            </ThemedText>
          </TouchableOpacity>}
        </View>
      </View>
    </ThemedSafeView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  container: {
    padding: 8,
    borderRadius: 8,
    gap: 8
  },
  text: {
    fontSize: 16,
    color: '#CECDC3'
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});
