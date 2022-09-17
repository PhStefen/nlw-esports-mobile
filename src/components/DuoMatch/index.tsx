import { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons'
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as CLipboard from 'expo-clipboard';
import { Loading } from '../Loading';


interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...options }: Props) {

    const [isCopying, setIsCopying] = useState(false);

    async function handleCopyDiscordToClipoard() {
        setIsCopying(true);
        await CLipboard.setStringAsync(discord);
        Alert.alert('Discord Copiado!', `Usuário foi copiado para área de transferência!`);
        setIsCopying(false);
        onClose();
    }

    return (
        <Modal
            animationType='fade'
            transparent
            statusBarTranslucent
            {...options}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />

                    <Heading
                        title="Let's play!"
                        subtitle='Agora é só começar a jogar!'
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />

                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscordToClipoard}
                        disabled={isCopying}
                    >
                        <Text style={styles.discord}>
                            {isCopying ? <Loading /> : discord}
                        </Text>
                    </TouchableOpacity>


                </View>
            </View>
        </Modal>
    );
}